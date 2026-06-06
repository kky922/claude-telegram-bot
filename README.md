# Claude Telegram Bot

A simple Telegram bot powered by Claude AI (Anthropic). Send any message and get an intelligent response.

## Features
- Connects Telegram to Claude API
- Uses `claude-haiku` for fast, cost-effective responses
- TypeScript + Telegraf

## Setup

1. Install dependencies
```bash
npm install
```

2. Copy and fill in your credentials
```bash
cp .env.example .env
```

3. Run
```bash
npx ts-node index.ts
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com) |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token from [@BotFather](https://t.me/BotFather) |

## Requirements
- Node.js 18+
- Anthropic API key
- Telegram bot token
