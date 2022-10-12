import type { Api } from 'telegram';
import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { PRICES, DISTRICTS } from '../constants';

import { getMessageData, dataToText } from '../channelAdapters';
export { addUser, removeUser, findUser, editUserSettings, loadAllUsers } from './user';
export { Reporter } from './reporter';
import { Storage } from '../storage';
import { Reporter } from './reporter';

export const cutChunks = (array: any[], chunkSize = 2): any[] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export const getForwardInfo = (channelId: number, message: Api.Message) => {
  const messageData = getMessageData(message.message, channelId);
  if (!messageData) return undefined;

  const { data, config } = messageData;
  Reporter.log(data);
  const replyText = dataToText(data);

  return {
    data,
    message: `${replyText}\nКанал: https://t.me/${config.link}\nОбъявление: https://t.me/c/${channelId}/${message.id}`,
  };
};

export const getDistrictId = (text: string): number => {
  const district = DISTRICTS.find(d => d.values.includes(text.toLowerCase()));
  return district?.key || 0;
};

export const getPriceLabel = (priceKey: number) => getPrice(priceKey)?.name.toLowerCase() || '';

export const getPrice = (priceKey: number) => PRICES.find(p => p.key === priceKey);

export const editMessageText = (
  replyText: string,
  chatId: number,
  messageId: number,
  inlineKeyboard: InlineKeyboardButton[][],
) =>
  Storage.bot.editMessageText(replyText, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
