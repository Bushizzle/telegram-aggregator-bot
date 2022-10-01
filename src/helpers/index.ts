import { TelegramClient } from 'telegram';
import { getMessageData, dataToText } from '../channelAdapters';
import { PRICES, DISTRICTS } from '../constants';
import type { TDistrict } from '../types';

export { addUser, removeUser, findUser, editUserSettings, loadAllUsers } from './user';
export { Reporter } from './reporter';
import { Reporter } from './reporter';

export const cutChunks = (sliceSize: number, array: any[]): any[] => {
  const result = [];
  const chunkSize = 2;
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export const getForwardInfo = async (client: TelegramClient, channelId: number, messageId: number, message: string) => {
  const messageData = getMessageData(message, channelId);
  if (!messageData?.data) return undefined;

  const { data, config } = messageData;
  Reporter.log(data);
  const replyTest = dataToText(data);

  return {
    data,
    message: `${replyTest}Канал: https://t.me/${config.link}\nОбъявление: https://t.me/c/${channelId}/${messageId}`,
  };
};

export const getDistrictsNames = (districts: TDistrict[]) =>
  districts.map(({ key }) => DISTRICTS.find(district => district.key === key)?.name);

export const getDistrictId = (text: string): number => {
  const district = DISTRICTS.find(d => d.values.includes(text.toLowerCase()));
  return district?.key || 0;
};

export const getPrice = (priceKey: number) => PRICES.find(p => p.key === priceKey);
