import fetch from 'node-fetch';
import { collectGroupMessages, generateMessageId } from '../../helpers';
const { TIME_WEEK } = require('./constants');
import { Storage } from '../../storage';

const { DYNAMO_API } = process.env;

const runBot = (client) => {
  Storage.bot.on('message', async (msg) => {
    const { chat, from, text } = msg;

    if (text === 'гагага') {
      const messages = await collectGroupMessages(client, 1377602081, TIME_WEEK);
      Storage.bot.sendMessage(from.id, `В канале ${messages.length} сообщений`);

      const messagesToSave = messages
        // .filter(msg => msg.message)
        .map(({ message, date, id }) => (
          {
            id: generateMessageId(1377602081, id),
            message,
            date,
            messageId: id,
          }
        ));

      const response = await fetch(DYNAMO_API, {
        method: 'POST',
        body: JSON.stringify({
          tableName: 'Rent',
          items: messagesToSave,
        }),
      });
      const dada = await response.json();

      bot.sendMessage(from.id, 'Сохранение закончено');

      console.log(dada);
    }

    // const msgs = await collectGroupMessages(client, 1377602081, TIME_MONTH);
    // console.log(msgs.length);
    // const result = await client.invoke(
    //   new Api.messages.GetHistory({
    //     peer: `-100${yamaId}`,
    //     limit: 100,
    //   })
    // );
    // bot.sendMessage(`-100${1568042374}`, `В канале ${result.messages.length} сообщений`);
    // bot.sendMessage(from.id, `В канале ${result.messages.length} сообщений`);
    // bot.sendMessage(from.id, text);
    // console.log(from);
  });
};

module.exports = {
  runBot,
};
