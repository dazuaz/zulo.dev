import type { APIRoute } from 'astro';
import { checkBotId } from 'botid/server';

export const prerender = false;

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const jsonError = (error: string, field?: 'name' | 'email' | 'message', status = 400) =>
  Response.json(field ? { error, field } : { error }, { status });

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

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
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

  const apiKey = import.meta.env.RESEND_API_KEY?.trim();
  const to = import.meta.env.CONTACT_TO_EMAIL?.trim();
  const from = import.meta.env.CONTACT_FROM_EMAIL?.trim() || 'Zulo <contact@zulo.dev>';

  if (!apiKey || !to || !isEmail(to)) {
    console.error('Missing or invalid Resend contact configuration');
    return Response.json({ error: 'Contact service is not configured' }, { status: 500 });
  }

  let emailRes: Response;
  try {
    emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Let's talk: ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `New inquiry from zulo.dev\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });
  } catch {
    console.error('Resend request failed or timed out');
    return Response.json({ error: 'Could not send message. Please try again.' }, { status: 502 });
  }

  if (!emailRes.ok) {
    // Keep inquiry contents and provider details out of logs and client responses.
    console.error('Resend API error:', emailRes.status);
    return Response.json({ error: 'Could not send message. Please try again.' }, { status: 502 });
  }

  return Response.json({ ok: true });
};
