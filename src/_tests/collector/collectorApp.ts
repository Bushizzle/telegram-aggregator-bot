import * as path from 'path';
import * as dotenv from 'dotenv';
import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
//@ts-expect-error, find types
import input from 'input';
import { Storage } from '../../storage';
import { Reporter } from '../../helpers';
import { collectGroupMessages } from './utils';

export const runCollector = async (channels: number[], envPath: string) => {
  Storage.init();
  Storage.channels = channels;

  dotenv.config({ path: path.resolve(__dirname, envPath) });
  const { TELEGRAM_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, USERS_LAMBDA, ADMIN_TELEGRAM_ID } =
    process.env;
  if (TELEGRAM_TOKEN && TELEGRAM_API_ID && TELEGRAM_API_HASH && USERS_LAMBDA) {
    ADMIN_TELEGRAM_ID && (Storage.admin = ADMIN_TELEGRAM_ID);

    const stringSession = new StringSession(TELEGRAM_API_SESSION);
    const client: TelegramClient = new TelegramClient(stringSession, +TELEGRAM_API_ID, TELEGRAM_API_HASH, {
      connectionRetries: 5,
    });

    await client.start({
      phoneNumber: async () => await input.text('Please enter your number: '),
      password: async () => await input.text('Please enter your password: '),
      phoneCode: async () => await input.text('Please enter the code you received: '),
      onError: err => Reporter.error([err]),
    });

    const msg = [];
    void channels.forEach(async (channelId: number): Promise<void> => {
      const messages = await collectGroupMessages(client, channelId, 0, 10);
      msg.push(...messages);
    });
    // write to file

    if (!TELEGRAM_API_SESSION) Reporter.console(client.session.save());
  } else {
    Reporter.error(['[ENV] not enough data in env variables to start client']);
  }
};
