export const REGEXP = {
  SOLD: /сдана?о?/i,
  FLOOR: /этаж(\s|-|\d|$)/i,
  PRICE: /\d{2,5}\s?(\$|лари?)(\s|$|\(|,|\.|-)/i,
  PRICE_REVERTED: /(\$|лари?)\s?\d{2,5}(\s|$|\(|,|\.|-)/i,
  SIZE: /\d{1,4}\s?(м²|кв|м2)(\s|$|\(|,|\.|-)/i,
  BEDROOMS: /\d{1,5}\s?спал(ьни|ьня|ен)/i,
  PETS: /(питом(цы|цами|ец|цем|ца))|(животн(ыми?|ых|ого))/i,
  ADDRESS:
    /(ул(ица|\s|$|\(|,|\.|-)|пр(оспект|\s|$|\(|,|\.|-)|ш(оссе|\s|$|\(|,|\.|-)|бульвара?|переул(ок|ка)|набережн(ая|ой))/i,
  GEO: /\/goo.gl\/maps/i,

  make: {
    district: (val: string) => new RegExp(`([^А-Яа-яA-Za-z]|^)${val}([^А-Яа-яA-Za-z]|$)`, 'i'),
  },
};