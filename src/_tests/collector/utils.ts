import { Api, TelegramClient } from 'telegram';
import { Reporter } from '../../helpers';

const getMessagesInPeriod = (messages: any[], period: number) => {
  const now = Date.now();
  return messages.filter(({ date }) => now - date * 1000 < period);
};

export const collectGroupMessages = async (client: TelegramClient, groupId: number, period: number, amount = 10) => {
  Reporter.log('start collecting');
  let offset = 0;
  const resultData = [];
  const result: any = await client.invoke(
    new Api.messages.GetHistory({
      peer: `-100${groupId}`,
      limit: amount,
    }),
  );
  const messages = period ? getMessagesInPeriod(result.messages, period) : result.messages;
  resultData.push(...messages);
  Reporter.log(`Iteration ${offset + 1} for channel ${groupId} done with ${messages.length} messages`);
  return resultData;
};

export const mapMinMsgData = (msg: any[]) =>
  msg.map(msg => ({
    className: 'UpdateNewChannelMessage',
    message: {
      message: msg.message,
      id: msg.id,
      peerId: {
        channelId: msg.peerId.channelId,
      },
    },
  }));
