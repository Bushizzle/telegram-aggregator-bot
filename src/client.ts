import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
//@ts-expect-error, find types
import input from 'input';
import * as Bot from 'node-telegram-bot-api';

import { getForwardInfo, loadAllUsers } from './helpers';
import { CHANNELS } from './constants';
import { broadcastBotSetup, broadcastBotNotify } from './bot';
import { Reporter } from './helpers';

export const runClient = async (
  token: string,
  apiId: number,
  apiHash: string,
  apiSession: string | undefined,
  usersLambda: string,
) => {
  const stringSession = new StringSession(apiSession);
  const client: TelegramClient = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  const bot = new Bot(token, { polling: true });
  const users = await loadAllUsers(usersLambda);

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: err => Reporter.error([err], bot),
  });

  if (!apiSession) Reporter.console(client.session.save());

  client.addEventHandler(async event => {
    const { className, message } = event;
    const channelId = parseInt(message?.peerId?.channelId?.value);

    if (className === 'UpdateNewChannelMessage' && CHANNELS.includes(channelId) && message?.message) {
      const parsedData = await getForwardInfo(client, channelId, message.id, message.message);
      Reporter.log(parsedData);

      if (parsedData?.data.price && parsedData.data.district) {
        broadcastBotNotify(bot, parsedData, users, usersLambda);
      }
    }
  });

  broadcastBotSetup(bot, users, usersLambda);
};
