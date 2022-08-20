const { cutChunks } = require('../helpers');

const {
	DISTRICTS,
} = require('../constants/districts');

const {
	PRICES,
} = require('../constants/prices');

const KEY_BACK = {
	text: 'Назад',
	callback_data: 'return_to_main',
};

const K_MAIN = [
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

const mapDistrictsKeyboard = user => [
	...cutChunks(2, DISTRICTS).map(chunk => chunk.map(
		(d => ({
			text: `${user.filters.districts.includes(d.key) ? '✔️' : '❌'} ${d.name}`,
			callback_data: `setDistrict:${d.key}`,
		}))
	)),
	[
		KEY_BACK,
	],
];

const mapPriceKeyboard = user => [
	...cutChunks(2, PRICES).map(chunk => chunk.map(
		(p => ({
			text: `${user.filters.price === p.key ? '✔️' : '❌'} ${p.name}`,
			callback_data: `setPrice:${p.key}`,
		}))
	)),
	[
		KEY_BACK,
	],
];

module.exports = {
	K_MAIN,
	mapDistrictsKeyboard,
	mapPriceKeyboard,
};
