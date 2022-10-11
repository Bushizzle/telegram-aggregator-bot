import * as path from 'path';
import * as dotenv from 'dotenv';
import { Storage } from './storage';
import { Reporter } from './helpers';
import { botSetup } from './bot';

export const runApp = (
  channels: number[],
  envPath: string,
  clientSetup: (id: number, hash: string, session: string | undefined) => Promise<void>,
): void => {
  Storage.init();
  Storage.channels = channels;

  dotenv.config({ path: path.resolve(__dirname, envPath) });
  const { TELEGRAM_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, USERS_LAMBDA, ADMIN_TELEGRAM_ID } =
    process.env;
  if (TELEGRAM_TOKEN && TELEGRAM_API_ID && TELEGRAM_API_HASH && USERS_LAMBDA) {
    ADMIN_TELEGRAM_ID && (Storage.admin = ADMIN_TELEGRAM_ID);
    Storage.setApi('usersLambda', USERS_LAMBDA);
    botSetup(TELEGRAM_TOKEN);
    void clientSetup(+TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION);
  } else {
    Reporter.error(['[ENV] not enough data in env variables to start client']);
  }
};
