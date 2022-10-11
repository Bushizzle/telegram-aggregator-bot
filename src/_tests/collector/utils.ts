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
      limit: 10,
    }),
  );
  const messages = period ? getMessagesInPeriod(result.messages, period) : result.messages;
  resultData.push(...messages);
  Reporter.log(`iteration ${offset} done with ${messages.length} messages`);
  return resultData;
};
