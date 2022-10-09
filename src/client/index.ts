import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
//@ts-expect-error, find types
import input from 'input';
import * as Bot from 'node-telegram-bot-api';

import { getForwardInfo, loadAllUsers } from '../helpers';
import { botSetup, botBroadcast } from '../bot';
import { Reporter } from '../helpers';
import { Storage } from '../storage';

export const runClient = async (token: string, apiId: number, apiHash: string, apiSession: string | undefined) => {
  const stringSession = new StringSession(apiSession);
  const client: TelegramClient = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  global.bot = new Bot(token, { polling: true });
  const usersLambda = Storage.getUsersLambda();
  const users = await loadAllUsers(usersLambda);
  Storage.setUsers(users);

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: err => Reporter.error([err]),
  });

  if (!apiSession) Reporter.console(client.session.save());

  client.addEventHandler(async event => {
    const { className, message } = event;
    const channelId = parseInt(message?.peerId?.channelId?.value || message?.peerId?.channelId);

    const channelsList = Storage.getChannels();

    if (className === 'UpdateNewChannelMessage' && channelsList.includes(channelId) && message?.message) {
      const parsedData = getForwardInfo(channelId, message.message, message.id);
      Reporter.log(parsedData);

      if (parsedData?.data?.district && parsedData?.data?.price) {
        botBroadcast(parsedData);
      }
    }
  });

  botSetup();
};
