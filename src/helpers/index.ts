import * as TelegramBot from 'node-telegram-bot-api';
import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { PRICES, DISTRICTS } from '../constants';

import { getMessageData, dataToText } from '../channelAdapters';
export { addUser, removeUser, findUser, editUserSettings, loadAllUsers } from './user';
export { Reporter } from './reporter';
import { Reporter } from './reporter';

export const cutChunks = (array: any[], chunkSize = 2): any[] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export const getForwardInfo = (channelId: number, message: string, messageId: number) => {
  const messageData = getMessageData(message, channelId);
  if (!messageData?.data?.price) return undefined;

  const { data, config } = messageData;
  Reporter.log(data);
  const replyText = dataToText(data);

  return {
    data,
    message: `${replyText}Канал: https://t.me/${config.link}\nОбъявление: https://t.me/c/${channelId}/${messageId}`,
  };
};

export const getDistrictId = (text: string): number => {
  const district = DISTRICTS.find(d => d.values.includes(text.toLowerCase()));
  return district?.key || 0;
};

export const getPriceLabel = (priceKey: number) => getPrice(priceKey)?.name.toLowerCase() || '';

export const getPrice = (priceKey: number) => PRICES.find(p => p.key === priceKey);

export const editMessageText = (
  bot: TelegramBot,
  replyText: string,
  chatId: number,
  messageId: number,
  inlineKeyboard: InlineKeyboardButton[][],
) =>
  bot.editMessageText(replyText, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
