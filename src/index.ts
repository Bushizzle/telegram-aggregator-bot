import { runClient } from './client';
const { TELEGRAM_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, USERS_LAMBDA, NODE_ENV } =
  process.env;

TELEGRAM_TOKEN && TELEGRAM_API_ID && TELEGRAM_API_HASH && USERS_LAMBDA
  ? void runClient(
      TELEGRAM_TOKEN,
      +TELEGRAM_API_ID,
      TELEGRAM_API_HASH,
      TELEGRAM_API_SESSION,
      USERS_LAMBDA,
      NODE_ENV === 'production',
    )
  : console.error('[ENV] not enough data in env variables to start client');
