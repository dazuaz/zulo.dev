import type { APIRoute } from 'astro';
import { checkBotId } from 'botid/server';

export const prerender = false;

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const NOTION_RICH_TEXT_LIMIT = 2000;
const NOTION_API_VERSION = '2022-06-28';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const jsonError = (error: string, field?: 'name' | 'email' | 'message', status = 400) =>
  Response.json(field ? { error, field } : { error }, { status });

const toRichText = (content: string) => {
  const chunks: { text: { content: string } }[] = [];
  for (let i = 0; i < content.length; i += NOTION_RICH_TEXT_LIMIT) {
    chunks.push({ text: { content: content.slice(i, i + NOTION_RICH_TEXT_LIMIT) } });
  }
  return chunks;
};

export const POST: APIRoute = async ({ request }) => {
  let verification: Awaited<ReturnType<typeof checkBotId>>;
  try {
    verification = await checkBotId();
  } catch (err) {
    console.error('BotID verification failed:', err);
    return Response.json({ error: 'Request could not be verified' }, { status: 503 });
  }

  if (verification.isBot) {
    return Response.json({ error: 'Request rejected' }, { status: 403 });
  }

  let payload: { name?: unknown; email?: unknown; message?: unknown };
  try {
    payload = await request.json();
  } catch {
    return jsonError('Invalid request body');
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > MAX_NAME) {
    return jsonError('Name is required', 'name');
  }
  if (!email || email.length > MAX_EMAIL || !isEmail(email)) {
    return jsonError('A valid email is required', 'email');
  }
  if (!message || message.length > MAX_MESSAGE) {
    return jsonError('Message is required', 'message');
  }

  const notionKey = import.meta.env.NOTION_API_KEY;
  const databaseId = import.meta.env.NOTION_CONTACT_DATABASE_ID;

  if (!notionKey || !databaseId) {
    console.error('Missing NOTION_API_KEY or NOTION_CONTACT_DATABASE_ID');
    return Response.json({ error: 'Contact service is not configured' }, { status: 500 });
  }

  let notionRes: Response;
  try {
    notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionKey}`,
        'Notion-Version': NOTION_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: name } }] },
          Email: { email },
          Message: { rich_text: toRichText(message) },
          Status: { status: { name: 'New' } },
        },
      }),
    });
  } catch (err) {
    console.error('Notion request failed:', err);
    return Response.json({ error: 'Could not send message' }, { status: 502 });
  }

  if (!notionRes.ok) {
    const body = await notionRes.text();
    console.error('Notion API error:', notionRes.status, body);
    return Response.json({ error: 'Could not send message' }, { status: 502 });
  }

  return Response.json({ ok: true });
};
