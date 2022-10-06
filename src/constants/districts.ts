import type { TDistrict } from '../types';

export const DISTRICTS: TDistrict[] = [
  {
    name: 'Авлабари',
    values: ['авлабари', 'avlabari'],
    key: 6,
  },
  {
    name: 'Багеби',
    values: ['багеби', 'bagebi'],
    key: 17,
  },
  {
    name: 'Ваке',
    values: ['ваке', 'vake'],
    key: 3,
  },
  {
    name: 'Вашлиджвари',
    values: ['вашлиджвари'],
    key: 13,
  },
  {
    name: 'Вера',
    values: ['вера', 'vera'],
    key: 8,
  },
  {
    name: 'Глдани',
    values: ['глдани', 'gldani'],
    key: 9,
  },
  {
    name: 'Дигоми',
    values: ['дигоми', 'digomi'],
    key: 1,
  },
  {
    name: 'Дидубе',
    values: ['дидубе', 'дидуби', 'didube', 'didybe', 'didubi', 'didybi'],
    key: 18,
  },
  {
    name: 'Исани',
    values: ['исани', 'isani'],
    key: 14,
  },
  {
    name: 'Крцаниси',
    values: ['крцаниси', 'krcanisi', 'krtsanisi'],
    key: 15,
  },
  {
    name: 'Мтацминда',
    values: ['мтацминда', 'mtacminda', 'mtatsminda'],
    key: 5,
  },
  {
    name: 'Мухиани',
    values: ['мухиани', 'muhiani', 'myhiani'],
    key: 10,
  },
  {
    name: 'Надзеладеви',
    values: ['надзеладеви', 'надзаладеви'],
    key: 11,
  },
  {
    name: 'Ортачала',
    values: ['ортачала', 'орточала', 'ortajala', 'ortojala', 'ortachala', 'ortochala'],
    key: 16,
  },
  {
    name: 'Сабуртало',
    values: ['сабуртало', 'saburtalo'],
    key: 2,
  },
  {
    name: 'Сололаки',
    values: ['сололаки', 'sololaki'],
    key: 4,
  },
  {
    name: 'Чугурети',
    values: ['чугурети', 'chugureti'],
    key: 7,
  },
];

export const ALL_DISTRICTS_KEYS = DISTRICTS.map(d => d.key);
