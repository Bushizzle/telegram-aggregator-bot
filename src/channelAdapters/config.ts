import { REGEXP } from '../constants';
import { TConfig } from '../types';

const ALL_MARKERS = [
  {
    key: 'size',
    matches: [REGEXP.SIZE],
  },
  {
    key: 'floor',
    matches: [REGEXP.FLOOR],
  },
  {
    key: 'rooms',
    matches: ['комнаты', 'комната'],
  },
  {
    key: 'bedrooms',
    matches: [REGEXP.BEDROOMS],
  },
  {
    key: 'balcony',
    matches: ['балкон'],
  },
  {
    key: 'pets',
    matches: [REGEXP.PETS],
  },
  {
    key: 'price',
    matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
  },
  {
    key: 'address',
    matches: [REGEXP.ADDRESS],
  },
  {
    key: 'geo',
    matches: [REGEXP.GEO],
  },
];

export const configs: TConfig[] = [
  // АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ 1148878384
  {
    id: 1148878384,
    link: 'arenda_ge',
    keys: [
      {
        key: 'text',
        matches: ['описание:'],
      },
      {
        key: 'address',
        matches: ['адрес:'],
      },
      {
        key: 'geo',
        matches: ['геолокация:'],
      },
      {
        key: 'pets',
        matches: ['животные:'],
      },
      {
        key: 'price',
        matches: ['цена:'],
      },
      {
        key: 'contacts',
        matches: ['контакты:'],
      },
      {
        key: 'agent',
        matches: ['сдаёт:'],
      },
      {
        key: 'floor',
        matches: ['этаж:'],
      },
    ],
    exceptions: ['ищужильё', 'батуми', 'кутаиси', 'владикавказ'],
  },
  // Тбилиси Объявления, Недвижимость, Аренда 1377602081
  {
    id: 1377602081,
    link: 'domtb',
    keys: [
      {
        key: 'text',
        matches: ['🏣 '],
      },
      {
        key: 'address',
        matches: ['📍 '],
      },
    ],
    markers: [
      {
        key: 'price',
        matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
      },
      {
        key: 'size',
        matches: [REGEXP.SIZE],
        exceptions: ['балкон'],
      },
      {
        key: 'floor',
        matches: [REGEXP.FLOOR],
      },
      {
        key: 'balcony',
        matches: ['балкон'],
      },
      {
        key: 'geo',
        matches: [REGEXP.GEO],
      },
    ],
    exceptions: ['батуми', 'кутаиси'],
  },
  // Tbilisi apartment rent 1751740207
  {
    id: 1751740207,
    link: 'Tbilisi_Rental',
    keys: [
      {
        key: 'address',
        matches: ['адрес:'],
      },
      {
        key: 'price',
        matches: ['цена:'],
      },
      {
        key: 'floor',
        matches: ['этаж:'],
      },
      {
        key: 'size',
        matches: ['квадратный метр:'],
      },
      {
        key: 'bathrooms',
        matches: ['ванная комната:'],
      },
      {
        key: 'rooms',
        matches: ['комната:'],
      },
      {
        key: 'bedrooms',
        matches: ['количество спален:'],
      },
    ],
    markers: [
      {
        key: 'price',
        matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
      },
      {
        key: 'geo',
        matches: [REGEXP.GEO],
      },
    ],
    exceptions: ['батуми', 'кутаиси'],
  },
  // Аренда квартир Тбилиси 1513001857
  {
    id: 1513001857,
    link: 'flatTbilisi',
    keys: [
      {
        key: 'address',
        matches: ['адрес:'],
      },
      {
        key: 'price',
        matches: ['цена:'],
      },
      {
        key: 'floor',
        matches: ['этаж:'],
      },
      {
        key: 'size',
        matches: ['квадратный метр:'],
      },
      {
        key: 'bathrooms',
        matches: ['ванная комната:'],
      },
      {
        key: 'rooms',
        matches: ['комната:'],
      },
      {
        key: 'bedrooms',
        matches: ['количество спален:'],
      },
    ],
    markers: [
      {
        key: 'price',
        matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
      },
      {
        key: 'geo',
        matches: [REGEXP.GEO],
      },
    ],
    exceptions: ['батуми', 'кутаиси'],
  },
  // 🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑 1170680593
  {
    id: 1170680593,
    link: 'GE4YOU',
    markers: ALL_MARKERS,
  },
  // АРЕНДА ТБИЛИСИ🏚 1748218743
  {
    id: 1748218743,
    link: 'arendatbilisikv',
    markers: ALL_MARKERS,
  },
  // Тбилиси 🏡 Аренда | Продажа | Недвижимость | Жилье | Квартиры 1356271391
  {
    id: 1356271391,
    link: 'tbilisi_apartments',
    markers: ALL_MARKERS,
    exceptions: [REGEXP.SOLD],
  },
  // Тбилиси аренда от собственников
  {
    id: 1541388090,
    link: 'owners_tbilisi',
    keys: [
      {
        key: 'address',
        matches: ['Адрес:'],
      },
      {
        key: 'price',
        matches: ['Цена:'],
      },
      {
        key: 'size',
        matches: ['Площадь:'],
      },
      {
        key: 'floor',
        matches: ['Этаж:'],
      },
      {
        key: 'rooms',
        matches: ['Комнат:'],
      },
      {
        key: 'bedrooms',
        matches: ['Спален:'],
      },
    ],
    markers: [
      {
        key: 'geo',
        matches: [REGEXP.GEO],
      },
    ],
  },
  // НОВЫЕ КАНАЛЫ
  // Недвижимость в Тбилиси
  {
    id: 1580911411,
    link: 'propertyintbilisi',
    markers: ALL_MARKERS,
    exceptions: ['батуми', 'кутаиси', 'владикавказ'],
  },
  // Aренда Квартиры Тбилиси
  {
    id: 1618128148,
    link: 'arendavgruzii',
    markers: ALL_MARKERS,
    exceptions: ['батуми', 'кутаиси', 'владикавказ'],
  },
  // Apartments in Tbilisi, Georgia.
  {
    id: 1744130346,
    link: 'yourhousGeo',
    markers: ALL_MARKERS,
    exceptions: ['батуми', 'кутаиси', 'владикавказ'],
  },
  // For rent in Georgia 🇬🇪 Аренда квартир в Грузии
  {
    id: 1359892966,
    link: 'Forrentge',
    markers: ALL_MARKERS,
    exceptions: ['батуми', 'кутаиси', 'владикавказ'],
  },
  // Квартиры в Тбилиси - NEW
  {
    id: 1676033482,
    link: 'kvartiry_v_tbilisi',
    markers: ALL_MARKERS,
    exceptions: ['батуми', 'кутаиси', 'владикавказ'],
  },
];
