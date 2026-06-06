export type BotConfig = {
  anthropicApiKey: string;
  telegramBotToken: string;
  allowedTelegramUserIds: Set<number>;
};

export function loadConfig(
  env: Record<string, string | undefined> = process.env,
): BotConfig {
  const anthropicApiKey = env.ANTHROPIC_API_KEY?.trim() ?? '';
  const telegramBotToken = env.TELEGRAM_BOT_TOKEN?.trim() ?? '';
  if (!anthropicApiKey || !telegramBotToken) {
    throw new Error('ANTHROPIC_API_KEY and TELEGRAM_BOT_TOKEN are required');
  }

  const allowedTelegramUserIds = new Set(
    (env.ALLOWED_TELEGRAM_USER_IDS ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => {
        const parsed = Number(value);
        if (!Number.isSafeInteger(parsed)) {
          throw new Error(`Invalid Telegram user ID: ${value}`);
        }
        return parsed;
      }),
  );

  return { anthropicApiKey, telegramBotToken, allowedTelegramUserIds };
}

export function isAllowed(userId: number | undefined, allowedIds: Set<number>): boolean {
  return allowedIds.size === 0 || (userId !== undefined && allowedIds.has(userId));
}

type ContentBlock = { type: string; text?: string };

export function extractText(content: ContentBlock[]): string {
  return content
    .filter((block) => block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text as string)
    .join('\n')
    .trim();
}
