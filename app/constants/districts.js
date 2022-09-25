const DISTRICTS = [
	{
		name: 'Дигоми',
		values: ['дигоми'],
		key: 1,
	},
	{
		name: 'Сабуртало',
		values: ['сабуртало', 'saburtalo'],
		key: 2,
	},
	{
		name: 'Ваке',
		values: ['ваке', 'vake'],
		key: 3,
	},
	{
		name: 'Сололаки',
		values: ['сололаки', 'sololaki'],
		key: 4,
	},
	{
		name: 'Мтацминда',
		values: ['мтацминда'],
		key: 5,
	},
	{
		name: 'Авлабари',
		values: ['авлабари'],
		key: 6,
	},
	{
		name: 'Чугурети',
		values: ['чугурети'],
		key: 7,
	},
	{
		name: 'Вера',
		values: ['вера', 'vera'],
		key: 8,
	},
	{
		name: 'Глдани',
		values: ['глдани'],
		key: 9,
	},
	{
		name: 'Мухиани',
		values: ['мухиани'],
		key: 10,
	},
	{
		name: 'Надзеладеви',
		values: ['надзеладеви', 'надзаладеви'],
		key: 11,
	},
	{
		name: 'Дигоми',
		values: ['дигоми', 'digomi'],
		key: 12,
	},
	{
		name: 'Вашлиджвари',
		values: ['вашлиджвари'],
		key: 13,
	},
	{
		name: 'Исани',
		values: ['исани', 'isani'],
		key: 14,
	},
	{
		name: 'Крцаниси',
		values: ['крцаниси'],
		key: 15,
	},
	{
		name: 'Ортачала',
		values: ['ортачала', 'орточала', 'ortajala', 'ortojala', 'ortachala', 'ortochala'],
		key: 16,
	},
	{
		name: 'Багеби',
		values: ['багеби', 'bagebi'],
		key: 17,
	},
	{
		name: 'Дидубе',
		values: ['дидубе', 'дидуби', 'didube', 'didybe', 'didubi', 'didybi'],
		key: 18,
	},
];

const ALL_DISTRICTS_KEYS = DISTRICTS.map(d => d.key);

const DICTIONARY = {
	district: 'Район',
	text: 'Описание',
	address: 'Адрес',
	geo: 'Геоточка',
	pets: 'Животные',
	price: 'Цена',
	contacts: 'Контакты',
	agent: 'Сдает',
	floor: 'Этаж',
	balcony: 'Балкон',
	size: 'Площадь',
	bathrooms: 'Ванные',
	rooms: 'Комнаты',
	bedrooms: 'Спальни',
};

module.exports = {
	DISTRICTS,
	DICTIONARY,
	ALL_DISTRICTS_KEYS,
};
