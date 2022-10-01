import type { TPrice } from '../types';

export const PRICES: TPrice[] = [
  {
    name: 'До 500',
    expression: n => n <= 500,
    key: 1,
  },
  {
    name: 'От 500 до 1000',
    expression: n => n >= 500 && n <= 1000,
    key: 2,
  },
  {
    name: 'От 1000 до 2000',
    expression: n => n >= 1000 && n <= 2000,
    key: 3,
  },
  {
    name: 'От 500',
    expression: n => n >= 500,
    key: 4,
  },
  {
    name: 'От 1000',
    expression: n => n >= 1000,
    key: 5,
  },
  {
    name: 'Любая',
    expression: n => !!n,
    key: 6,
  },
];

export const KEY_BACK = {
  text: 'СОХРАНИТЬ',
  callback_data: 'return_to_main',
};

export const KEYBOARD_MAIN = [
  [
    {
      text: 'Район',
      callback_data: 'district',
    },
    {
      text: 'Цена',
      callback_data: 'price',
    },
  ],
];
