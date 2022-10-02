import { REGEXP } from '../constants';
import type { TAptData, TConfig, TDistrict, TUser } from '../types';
import { cutChunks } from './index';

export const removeGarbage = (str: string, key: string): string => {
  if (key === 'contacts') return str;
  return (
    str
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '',
      )
      // eslint-disable-next-line no-misleading-character-class
      .replace(/[\u200B\u200C\u200D\uFEFF\u2028\u2029\uFE0F]/g, '')
      .trim()
  );
};

export const mapStrings = (str: string, divider?: string): string[] => str.split(divider || '\n');

export const getValue = (str: string, substr: string): string =>
  str
    .substring(substr.length + str.toLowerCase().indexOf(substr))
    .trim()
    .replace(/[!@#$%^&*]/g, '');

export const getKeypair = (config: TConfig, str: string) => {
  const configKey = config?.keys?.find(key => key.matches.find(val => str.match(new RegExp(val, 'i'))));
  const value = configKey?.matches.find(val => str.match(new RegExp(val, 'i')));
  return configKey && { key: configKey.key, value };
};

export const haveExceptions = (message: string, { exceptions }: Partial<TConfig>) =>
  exceptions?.some(val => message.toLowerCase().match(val));

export const getDistrict = (message: string, districts: TDistrict[]) =>
  districts.find(d => d.values.some(val => message.toLowerCase().match(REGEXP.make.district(val.toLowerCase()))));

export const getConfig = (id: number, configs: TConfig[]) => configs.find(conf => conf.id === id);

export const isDistrict = (str: string, districts: TDistrict[]) =>
  districts.find(el => el.values.some(val => str.trim().toLowerCase() === val.trim().toLowerCase()));

export const sortObjectKeys = (data: Partial<TAptData>) =>
  Object.keys(data)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: data[key as keyof TAptData],
      }),
      {},
    );

export const messagesInterval = (
  users: TUser[],
  // eslint-disable-next-line no-unused-vars
  callback: (id: number) => unknown,
  groupSize = 10,
  timeoutStep = 1000,
) => {
  cutChunks(users, groupSize).forEach((chunk: any[], index) => {
    setTimeout(() => {
      chunk.forEach(({ id }) => callback(id));
    }, timeoutStep * index);
  });
};
