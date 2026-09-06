import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';
import { createContext, SourceTextModule, SyntheticModule } from 'node:vm';

const source = stripTypeScriptTypes(await readFile(new URL('../src/pages/api/contact.ts', import.meta.url), 'utf8'));
const valid = { name: 'Alex', email: 'alex@example.com', message: 'Hello\nCan we talk?' };

async function setup(options: {
  env?: Record<string, string>;
  bot?: boolean;
  botError?: boolean;
  fetchError?: boolean;
  status?: number;
} = {}) {
  const calls: { url: string; init: RequestInit }[] = [];
  const context = createContext({
    Response, AbortSignal,
    console: { error() {} },
    fetch: async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      if (options.fetchError) throw new Error('Network failure');
      return Response.json({ id: 'test-email', message: 'private provider detail' }, { status: options.status ?? 200 });
    },
  });
  const bot = new SyntheticModule(['checkBotId'], function () {
    this.setExport('checkBotId', async () => {
      if (options.botError) throw new Error('Verification unavailable');
      return { isBot: options.bot ?? false };
    });
  }, { context });
  const route = new SourceTextModule(source, {
    context,
    initializeImportMeta(meta) {
      meta.env = options.env ?? { RESEND_API_KEY: 'test-key', CONTACT_TO_EMAIL: 'owner@example.com' };
    },
  });
  await route.link(specifier => {
    assert.equal(specifier, 'botid/server');
    return bot;
  });
  await route.evaluate();
  const post = (body: unknown = valid, raw = false) => (route.namespace as { POST: Function }).POST({
    request: new Request('https://zulo.dev/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: raw ? body : JSON.stringify(body),
    }),
  }) as Promise<Response>;
  return { post, calls };
}

test('sends the full inquiry only to the configured inbox with visitor Reply-To', async () => {
  const { post, calls } = await setup();
  const response = await post({ ...valid, name: ' Alex\r\nSmith ', message: 'x'.repeat(5000) });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const payload = JSON.parse(calls[0].init.body as string);
  assert.equal(payload.from, 'Zulo <contact@zulo.dev>');
  assert.deepEqual(payload.to, ['owner@example.com']);
  assert.equal(payload.reply_to, valid.email);
  assert.equal(payload.subject, "Let's talk: Alex Smith");
  assert.ok(payload.text.endsWith('x'.repeat(5000)));
  assert.equal(payload.html, undefined);
  assert.ok(calls[0].init.signal);
});

test('supports a configured sender', async () => {
  const { post, calls } = await setup({ env: {
    RESEND_API_KEY: 'test-key', CONTACT_TO_EMAIL: 'owner@example.com', CONTACT_FROM_EMAIL: 'Zulo <forms@zulo.dev>',
  } });
  assert.equal((await post()).status, 200);
  assert.equal(JSON.parse(calls[0].init.body as string).from, 'Zulo <forms@zulo.dev>');
});

test('invalid input never triggers an email', async () => {
  const { post, calls } = await setup();
  for (const body of [null, [], 'string', {}, { ...valid, name: '' }, { ...valid, email: 'invalid' }, { ...valid, message: 'x'.repeat(5001) }]) {
    assert.equal((await post(body)).status, 400);
  }
  assert.equal((await post('{', true)).status, 400);
  assert.equal(calls.length, 0);
});

test('bots and unavailable verification never trigger an email', async () => {
  for (const [options, status] of [[{ bot: true }, 403], [{ botError: true }, 503]] as const) {
    const { post, calls } = await setup(options);
    assert.equal((await post()).status, status);
    assert.equal(calls.length, 0);
  }
});

test('missing credentials or destination fail without sending', async () => {
  for (const env of [{}, { RESEND_API_KEY: 'test-key' }, { RESEND_API_KEY: 'test-key', CONTACT_TO_EMAIL: 'invalid' }]) {
    const { post, calls } = await setup({ env });
    assert.equal((await post()).status, 500);
    assert.equal(calls.length, 0);
  }
});

test('provider rejections and network failures never report success or expose provider details', async () => {
  for (const options of [{ status: 401 }, { status: 422 }, { status: 429 }, { status: 500 }, { fetchError: true }]) {
    const { post } = await setup(options);
    const response = await post();
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'Could not send message. Please try again.' });
  }
});
