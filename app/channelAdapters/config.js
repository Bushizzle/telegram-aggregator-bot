const { REGEXP } = require('../constants/regexp');

module.exports = [
	// АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ 1148878384
	{
		id: 1148878384,
		keys: [
			// {
			// 	key: 'district',
			// 	matches: ['в:'],
			// },
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
		],
		exceptions: ['батуми', 'кутаиси'],
	},
	// Tbilisi apartment rent 1751740207
	{
		id: 1751740207,
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
			}
		],
		markers: [
			{
				key: 'price',
				matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
			},
		],
		exceptions: ['батуми', 'кутаиси'],
	},
	// Аренда квартир Тбилиси 1513001857
	{
		id: 1513001857,
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
			}
		],
		markers: [
			{
				key: 'price',
				matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
			},
		],
		exceptions: ['батуми', 'кутаиси'],
	},
	// 🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑 1170680593
	{
		id: 1170680593,
		markers: [
			{
				key: 'size',
				matches: [REGEXP.SIZE],
			},
			{
				key: 'floor',
				matches: [REGEXP.FLOOR],
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
		],
	},
	// АРЕНДА ТБИЛИСИ🏚 1748218743
	{
		id: 1748218743,
		markers: [
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
		],
	},
	// Тбилиси 🏡 Аренда | Продажа | Недвижимость | Жилье | Квартиры 1356271391
	{
		id: 1356271391,
		markers: [
			{
				key: 'size',
				matches: [REGEXP.SIZE],
			},
			{
				key: 'price',
				matches: [REGEXP.PRICE, REGEXP.PRICE_REVERTED],
			},
			{
				key: 'bedrooms',
				matches: [REGEXP.BEDROOMS],
			},
			{
				key: 'floor',
				matches: [REGEXP.FLOOR],
			},
			{
				key: 'address',
				matches: [REGEXP.ADDRESS],
			}
		],
		exceptions: [REGEXP.SOLD],
	},
	{
		id: 1568042374,
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
		],
		exceptions: ['батуми', 'кутаиси'],
	},
	{
		id: 0,
		keys: {},
		markers: [
			{
				key: '',
				matches: [''],
				exceptions: [],
			},
		],
		exceptions: [],
	}
];
