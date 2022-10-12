import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
//@ts-expect-error, find types
import input from 'input';

import { getForwardInfo } from '../../helpers';
import { botBroadcast } from '../../bot';
import { Reporter } from '../../helpers';
import { Storage } from '../../storage';

import * as mockMessages from '../mocks/messages.json';
import * as mockUsers from '../mocks/users.json';

export const runTestClient = async (apiId: number, apiHash: string, apiSession: string | undefined): Promise<void> => {
  const stringSession = new StringSession(apiSession);
  const client: TelegramClient = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  Storage.users = mockUsers;

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: err => Reporter.error([err]),
  });

  if (!apiSession) Reporter.console(client.session.save());

  const undelivered: any[] = [];

  for (const event of mockMessages as any) {
    const { className, message } = event;
    const channelId = parseInt(message?.peerId?.channelId);
    if (className === 'UpdateNewChannelMessage' && Storage.channels.includes(channelId) && message?.message) {
      const parsedData = getForwardInfo(channelId, message);
      Reporter.log(parsedData);
      if (parsedData?.data?.district || parsedData?.data?.address || parsedData?.data?.geo) {
        botBroadcast(parsedData);
      } else {
        undelivered.push(message.id);
      }
    } else {
      undelivered.push(message.id);
    }
  }
  setTimeout(() => {
    Reporter.admin(
      `Messages delivered: ${mockMessages.length - undelivered.length}/${mockMessages.length}${
        undelivered.length ? ', undelivered: ' + undelivered.join(', ') : ''
      }`,
    );
    // eslint-disable-next-line no-console
    console.log(undelivered);
  }, 1000);
};
