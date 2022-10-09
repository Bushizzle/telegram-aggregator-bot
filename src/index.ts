import * as path from 'path';
import * as dotenv from 'dotenv';
import { runClient } from './client';
import { Reporter } from './helpers';
import { Storage } from './storage';
import { CHANNELS } from './constants';

Storage.init();
Storage.setChannels(CHANNELS);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { TELEGRAM_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, USERS_LAMBDA } = process.env;

if (TELEGRAM_TOKEN && TELEGRAM_API_ID && TELEGRAM_API_HASH && USERS_LAMBDA) {
  Storage.setUsersLambda(USERS_LAMBDA);
  void runClient(TELEGRAM_TOKEN, +TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION);
} else {
  Reporter.error(['[ENV] not enough data in env variables to start client']);
}
