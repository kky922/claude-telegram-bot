import { Telegraf } from 'telegraf';
import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

bot.on('text', async (ctx) => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: ctx.message.text }],
    });
    
    // @ts-ignore
    await ctx.reply(response.content[0].text);
  } catch (error) {
    console.error(error);
    await ctx.reply('오류가 발생했습니다.');
  }
});

bot.launch();
console.log('클로드 봇이 시작되었습니다!');