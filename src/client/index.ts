import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
//@ts-expect-error, find types
import input from 'input';

import { getForwardInfo, loadAllUsers } from '../helpers';
import { botBroadcast } from '../bot';
import { Reporter } from '../helpers';
import { Storage } from '../storage';
import { ifInteresting } from '../helpers/channelMessages';

export const runClient = async (
  apiId: number,
  apiHash: string,
  apiSession: string | undefined,
): Promise<TelegramClient> => {
  const stringSession = new StringSession(apiSession);
  const client: TelegramClient = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  Storage.users = await loadAllUsers(Storage.api.usersLambda);

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: err => Reporter.error([err]),
  });

  if (!apiSession) Reporter.console(client.session.save());

  client.addEventHandler(async event => {
    const { className: eventClassName, message } = event;
    const channelId = parseInt(message?.peerId?.channelId?.value || message?.peerId?.channelId);

    ifInteresting(eventClassName, channelId, message, () => {
      const parsedData = getForwardInfo(channelId, message.message, message.id);
      Reporter.log(parsedData);
      parsedData && botBroadcast(parsedData);
    });
  });

  return client;
};
