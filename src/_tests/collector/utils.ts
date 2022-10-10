import { Reporter } from '../../helpers';
import { TelegramClient } from "telegram";


function getMessagesInPeriod(messages, period) {
  const now = Date.now();
  return messages.filter(({ date }) => now - date * 1000 < period);
}

const collectGroupMessages = async (client: TelegramClient, groupId, period) => {
  Reporter.info('start collecting');
  let offset = 0;
  let finished = false;
  const resultData = [];
  do {
    const result = await client.invoke(
      new Api.messages.GetHistory({
        peer: `-100${groupId}`,
        limit: 100,
        addOffset: offset * 100,
      }),
    );
    const messages = getMessagesInPeriod(result.messages, period);
    resultData.push(...messages);
    logger.info(`iteration ${offset} done with ${messages.length} messages`);
    offset += 1;
    if (messages.length < 100) finished = true;
  } while (!finished);
  return resultData;
};
