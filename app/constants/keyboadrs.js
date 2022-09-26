const KEY_BACK = {
  text: 'СОХРАНИТЬ',
  callback_data: 'return_to_main',
};

const KEYBOARD_MAIN = [
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

module.exports = {
  KEYBOARD_MAIN,
  KEY_BACK,
};
