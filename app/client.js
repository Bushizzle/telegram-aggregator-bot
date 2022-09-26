const log4js = require('log4js');

log4js.configure({
  appenders: {
    logger: {
      type: 'file',
      filename: 'logfile.log',
    },
  },
  categories: {
    default: {
      appenders: ['logger'],
      level: 'all',
    },
  },
});
const logger = log4js.getLogger('logger');

const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
const Bot = require('node-telegram-bot-api');
require('dotenv').config();

const { getForwardInfo } = require('./helpers');
const { CHANNELS, RENT_TB, GIGARENT_CHANNEL_TBILISI } = require('./constants/channels');
const { broadcastBotSetup, broadcastBotNotify } = require('./botBrodcaster');

const {
  TELEGRAM_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_API_SESSION, NODE_ENV,
} = process.env;

(async () => {
  if (NODE_ENV === 'development') console.log('Running in dev mode');
  const stringSession = new StringSession(TELEGRAM_API_SESSION);
  const client = new TelegramClient(stringSession, +TELEGRAM_API_ID, TELEGRAM_API_HASH, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  });

  if (!TELEGRAM_API_SESSION) console.log(client.session.save());

  client.addEventHandler(async (event) => {
    const { className, message } = event;
    if (className === 'UpdateNewChannelMessage') {
      const channelId = parseInt(message.peerId.channelId.value);
      // console.log(CHANNELS.includes(channelId));

      if (CHANNELS.includes(channelId) && message?.message) {
        // console.log(event);
        // console.log(message.peerId.channelId);
        // console.log(message.peerId.channelId.value);

        client.invoke(
          new Api.messages.ForwardMessages({
            fromPeer: `-100${channelId}`,
            id: [message.id],
            randomId: [BigInt(String(parseInt(Math.random() * 1000000000000)))],
            toPeer: `-100${GIGARENT_CHANNEL_TBILISI}`,
          }),
        );

        const parsedData = await getForwardInfo(client, channelId, message.id, message.message);
        logger.info(parsedData);

        if (!parsedData) return false;

        if (parsedData.data.price && parsedData.data.district) {
          broadcastBotNotify(bot, parsedData, NODE_ENV);
        }

        await client.invoke(
          new Api.messages.SendMessage({
            peer: `-100${RENT_TB}`,
            message: parsedData.message,
            noWebpage: true,
          }),
        );
      }
    }
  });

  const bot = new Bot(TELEGRAM_TOKEN, { polling: true });
  broadcastBotSetup(bot, client);
})();
