const { cutChunks } = require('../helpers');
const { DISTRICTS } = require('../constants/districts');
const { PRICES } = require('../constants/prices');
const { KEYBOARD_MAIN, KEY_BACK } = require('../constants/keyboadrs');

const keyboardMain = () => KEYBOARD_MAIN;

const keyboardDistricts = (districts) => [
  ...cutChunks(2, DISTRICTS).map((chunk) => chunk.map(
    ((d) => ({
      text: `${districts.includes(d.key) ? '✔️' : '❌'} ${d.name}`,
      callback_data: `setDistrict:${d.key}`,
    })),
  )),
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
  [
    KEY_BACK,
  ],
];

const keyboardPrice = (user) => [
  ...cutChunks(2, PRICES).map((chunk) => chunk.map(
    ((p) => ({
      text: `${user.settings.price === p.key ? '✔️' : '❌'} ${p.name}`,
      callback_data: `setPrice:${p.key}`,
    })),
  )),
  [
    KEY_BACK,
  ],
];

module.exports = {
  keyboardMain,
  keyboardDistricts,
  keyboardPrice,
};
