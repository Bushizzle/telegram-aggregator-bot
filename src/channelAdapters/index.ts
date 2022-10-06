import { DICTIONARY, DISTRICTS } from '../constants';
import {
  removeGarbage,
  mapStrings,
  getValue,
  getKeypair,
  haveExceptions,
  getDistrict,
  getConfig,
} from '../helpers/channelMessages';

import type { TAptData, TConfig } from '../types';
import type { TMessageData } from '../types';
import { configs } from './config';

const adapterByKeys = (message: string, config: TConfig) =>
  config?.keys?.length
    ? mapStrings(message).reduce((res: Partial<TAptData>, str) => {
        const keyPair = getKeypair(config, str);
        if (keyPair?.value && keyPair?.key) res[keyPair.key] = removeGarbage(getValue(str, keyPair.value), keyPair.key);
        return res;
      }, {})
    : {};

const adapterByMarkers = (message: string, config: TConfig) =>
  config?.markers?.length
    ? mapStrings(message).reduce((res: Partial<TAptData>, str) => {
        const marker = config?.markers?.find(({ matches, exceptions }) =>
          matches.some(val => str.match(val) && (!exceptions || !haveExceptions(str, { exceptions }))),
        );
        if (marker) res[marker.key] = removeGarbage(str, marker.key);
        return res;
      }, {})
    : {};

export const getMessageData = (message: string, channelId: number): TMessageData | undefined => {
  const config = getConfig(channelId, configs);
  if (!config || haveExceptions(message, config)) return undefined;
  const data: Partial<TAptData> = {
    ...adapterByKeys(message, config),
    ...adapterByMarkers(message, config),
  };

  if (!data.price) return undefined;

  const district = getDistrict(message, DISTRICTS);
  if (district) data.district = district.name;

  return {
    data: data as TAptData,
    config,
  };
};

export const dataToText = (data: TAptData) => {
  let text = '';
  for (const key in data) {
    text += `${DICTIONARY[key as keyof typeof DICTIONARY]}: ${data[key as keyof TAptData]}\n`;
  }
  return text.split('\n').sort().join('\n');
};
