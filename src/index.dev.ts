import * as path from 'path';
import * as dotenv from 'dotenv';
import { runClient } from './client';
import { Reporter } from './helpers';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { TELEGRAM_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, USERS_LAMBDA } = process.env;

TELEGRAM_TOKEN && TELEGRAM_API_ID && TELEGRAM_API_HASH && USERS_LAMBDA
  ? void runClient(TELEGRAM_TOKEN, +TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, USERS_LAMBDA)
  : Reporter.error(['[ENV] not enough data in env variables to start client']);
