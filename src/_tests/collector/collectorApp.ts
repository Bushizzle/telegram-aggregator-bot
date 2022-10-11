import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
//@ts-expect-error, find types
import input from 'input';
import { Storage } from '../../storage';
import { Reporter } from '../../helpers';
import { collectGroupMessages, mapMinMsgData } from './utils';

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
    if (!TELEGRAM_API_SESSION) Reporter.console(client.session.save());

    const messages = await Promise.all(
      channels.map((channelId: number) => collectGroupMessages(client, channelId, 0, 30)),
    );
    Reporter.log('Writing results to messages.json...');
    const textMessages = messages.flat().filter(message => message.message);
    fs.writeFileSync('./src/_tests/mocks/messages.json', JSON.stringify(mapMinMsgData(textMessages)));
    fs.writeFileSync('./src/_tests/mocks/messagesRaw.json', JSON.stringify(messages.flat()));
    Reporter.log('Writing done');
    await client.destroy();
    return;
  } else {
    Reporter.error(['[ENV] not enough data in env variables to start client']);
  }
};
