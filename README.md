# Claude Telegram Bot

Telegram 텍스트 메시지를 Claude에 전달하고 답변을 돌려주는 최소 TypeScript 봇입니다.
선택적으로 허용된 Telegram 사용자만 접근하게 제한할 수 있습니다.

## 기능

- Claude Messages REST API 연동
- 필수 환경변수 시작 전 검증
- Telegram 사용자 ID allowlist
- 텍스트 응답 블록의 명시적 형식 검사
- SIGINT·SIGTERM 정상 종료

## 설치

```bash
git clone https://github.com/kky922/claude-telegram-bot.git
cd claude-telegram-bot
npm ci
cp .env.example .env
```

## 설정

```env
ANTHROPIC_API_KEY=...
TELEGRAM_BOT_TOKEN=...
ALLOWED_TELEGRAM_USER_IDS=123456789,987654321
```

`ALLOWED_TELEGRAM_USER_IDS`를 비우면 모든 사용자를 허용합니다. 공개 봇에서는 반드시
사용자 ID를 지정하세요.

## 실행

```bash
npm start
```

## 테스트

```bash
npm run typecheck
npm test
```

## 주의사항

대화 내용은 Anthropic API로 전송됩니다. 개인정보나 비밀정보를 메시지에 포함하지 마세요.
운영 환경에서는 Telegram 토큰과 API 키를 정기적으로 교체하세요.

## 라이선스

MIT
