import type { APIRoute } from 'astro';
import { checkBotId } from 'botid/server';
import { Resend } from 'resend';

export const prerender = false;

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const POST: APIRoute = async ({ request }) => {
  const verification = await checkBotId();
  if (verification.isBot) {
    return Response.json({ error: 'Request rejected' }, { status: 403 });
  }

  let payload: { name?: unknown; email?: unknown; message?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > MAX_NAME) {
    return Response.json({ error: 'Name is required' }, { status: 400 });
  }
  if (!email || email.length > MAX_EMAIL || !isEmail(email)) {
    return Response.json({ error: 'A valid email is required' }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return Response.json({ error: 'Message is required' }, { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL ?? 'Zulo.dev <onboarding@resend.dev>';

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
    return Response.json({ error: 'Email service is not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `zulo.dev contact form — ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;color:#0f172a;">
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <hr />
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return Response.json({ error: 'Could not send message' }, { status: 502 });
  }

  return Response.json({ ok: true });
};
