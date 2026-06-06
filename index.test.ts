import assert from 'node:assert/strict';
import test from 'node:test';

import { extractText, isAllowed, loadConfig } from './bot-core.ts';

test('loadConfig rejects missing secrets', () => {
  assert.throws(() => loadConfig({}), /required/);
});

test('loadConfig parses allowed Telegram user IDs', () => {
  const config = loadConfig({
    ANTHROPIC_API_KEY: 'test-key',
    TELEGRAM_BOT_TOKEN: 'test-token',
    ALLOWED_TELEGRAM_USER_IDS: '123, 456',
  });
  assert.deepEqual([...config.allowedTelegramUserIds], [123, 456]);
});

test('isAllowed supports an optional allowlist', () => {
  assert.equal(isAllowed(1, new Set()), true);
  assert.equal(isAllowed(1, new Set([1])), true);
  assert.equal(isAllowed(2, new Set([1])), false);
});

test('extractText ignores non-text response blocks', () => {
  const content = [
    { type: 'text', text: 'hello', citations: null },
    { type: 'text', text: 'world', citations: null },
  ];
  assert.equal(extractText(content), 'hello\nworld');
});
