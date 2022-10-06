import { cutChunks } from '../helpers';
import { DISTRICTS, PRICES, KEYBOARD_MAIN, KEY_BACK } from '../constants';
import type { TDistrict, TPrice, TUser } from '../types';

export const keyboardMain = () => KEYBOARD_MAIN;

export const keyboardDistricts = (districtsIds: number[]) => [
  ...cutChunks(DISTRICTS, 2).map((chunk: TDistrict[]) =>
    chunk.map(d => ({
      text: `${districtsIds.includes(d.key) ? '✅️' : ''} ${d.name}`,
      callback_data: `setDistrict:${d.key}`,
    })),
  ),
  [
    {
      text: 'ВЫБРАТЬ ВСЕ',
      callback_data: 'setDistrict:all',
    },
  ],
  [
    {
      text: 'ОЧИСТИТЬ ВЫБОР',
      callback_data: 'setDistrict:none',
    },
  ],
  [KEY_BACK],
];

export const keyboardPrice = (user: TUser) => [
  ...cutChunks(PRICES, 2).map((chunk: TPrice[]) =>
    chunk.map(p => ({
      text: `${user.settings.price === p.key ? '✅️' : ''} ${p.name}`,
      callback_data: `setPrice:${p.key}`,
    })),
  ),
  [KEY_BACK],
];
