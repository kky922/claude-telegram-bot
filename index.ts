import { Telegraf } from 'telegraf';
import { pathToFileURL } from 'node:url';

import type { BotConfig } from './bot-core.ts';
import { extractText, isAllowed, loadConfig } from './bot-core.ts';

type ContentBlock = { type: string; text?: string };

export function createBot(config: BotConfig): Telegraf {
  const bot = new Telegraf(config.telegramBotToken);

  bot.on('text', async (ctx) => {
    if (!isAllowed(ctx.from?.id, config.allowedTelegramUserIds)) {
      await ctx.reply('허용되지 않은 사용자입니다.');
      return;
    }

    try {
      const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'x-api-key': config.anthropicApiKey,
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          messages: [{ role: 'user', content: ctx.message.text }],
        }),
      });
      if (!apiResponse.ok) {
        throw new Error(`Anthropic API returned ${apiResponse.status}`);
      }
      const response = (await apiResponse.json()) as { content?: ContentBlock[] };
      await ctx.reply(extractText(response.content ?? []) || '텍스트 응답이 없습니다.');
    } catch (error) {
      console.error(error);
      await ctx.reply('요청을 처리하지 못했습니다.');
    }
  });

  return bot;
}

export async function main(): Promise<void> {
  const bot = createBot(loadConfig());
  const shutdown = (signal: string) => bot.stop(signal);
  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
  await bot.launch();
  console.log('Claude Telegram bot started');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
