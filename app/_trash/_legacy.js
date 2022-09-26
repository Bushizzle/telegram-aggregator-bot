const {getConfig, haveExceptions, getDistrict, mapStrings, isDistrict} = require("../helpers/channelMessages");
const configs = require("../channelAdapters/config");
const { DISTRICTS } = require("../constants/districts");
const { DICTIONARY } = require("../constants/translations");
const adapters = {
	// АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ 1148878384
	1148878384: (message) => {
		const config = getConfig(1148878384, configs);
		if (haveExceptions(message, config)) return false;
		const result = adapterByKeys(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	// Тбилиси Объявления, Недвижимость, Аренда 1377602081
	1377602081: (message) => {
		const config = getConfig(1377602081, configs);
		if (haveExceptions(message, config)) return false;
		const result = {
			...adapterByKeys(message, config),
			...adapterByMarkers(message, config),
		}
		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;
		return result;
	},
	// Tbilisi apartment rent 1751740207
	1751740207: (message) => {
		const config = getConfig(1751740207, configs);
		if (haveExceptions(message, config)) return false;
		const result = adapterByKeys(message, config);
		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	// Аренда квартир Тбилиси 1513001857
	1513001857: (message) => {
		const config = getConfig(1513001857, configs);
		if (haveExceptions(message, config)) return false;

		const result = {
			...adapterByKeys(message, config),
			...adapterByMarkers(message, config),
		};

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		const address = mapStrings(message)[0];
		if (address && !isDistrict(address, DISTRICTS)) result.address = address;

		const geo = mapStrings(message)[1];
		if (geo.includes('https://')) result.geo = geo;

		return result;
	},
	// 🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑 1170680593
	1170680593: (message) => {
		const config = getConfig(1170680593, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		const address = mapStrings(message)[1].trim();
		if (address && !isDistrict(address, DISTRICTS)) result.address = address;

		return result;
	},
	// АРЕНДА ТБИЛИСИ🏚 1748218743
	1748218743: (message) => {
		const config = getConfig(1748218743, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		const address = mapStrings(message)[0].trim();
		if (address && !isDistrict(address, DISTRICTS)) result.address = address;

		return result;
	},
	// Тбилиси 🏡 Аренда | Продажа | Недвижимость | Жилье | Квартиры 1356271391
	1356271391: (message) => {
		const config = getConfig(1748218743, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	1568042374: (message) => {
		const config = getConfig(1748218743, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	translate: (result) => {
		let text = '';
		for (let key in result) {
			text += `${DICTIONARY[key]}: ${result[key]}\n`;
		}
		return text;
	}
}

// const testMock = (id) => mock[id].forEach(adapters[id]);

const mocks = {
	// АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ 1148878384
	1148878384: [
		`👤Я: #СдаюЖильё 🏨
📍В: #Тбилиси
ℹ️Описание: Срочно сдаю светлую уютную квартиру самом зелёным районе ,из дома красивые виды на тбилиси,автобусная остановка у дома, пешком до метро дидубе 15 минут , вокруг дома детские площадки и стадионы , супермаркеты, аптеки , продуктовые лавки.
- 4 комнаты 
- 3 спальни + можно устроит дополнительны комнату для спальни или под кабинет
- 13 этаж
- балкон
🗺Геолокация: https://goo.gl/maps/2yGGBXMTduK2BkgW7
🐶Животные: #ПоДоговорённости 📞
💰Цена: 550$
🔎Сдаёт: #Хозяин

📲Контакты: 995558766776 @Khar_Goch, Gocha Kharaishvili, #id374688953

🖼Больше фото смотрите в комментариях под объявлением.
*️⃣Нажмите на название города для фильтра объявлений.

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

☑️Больше объявлений на @arenda_ge`,
		`👤Я: #ИщуЖильё 🙂
📍В: Тбилиси
💡Инфо: Тбилиси,Лагодехи ,2 комнатную
🐶Животные с собой: Нет ❌
💵Интересует цена: Посуточная аренда

📲Контакты:  @VERIKO86, Верико, #id1378736346

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)`,
		`АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ, [18.07.2022 19:01]
[ Photo ]
👤Я: #СдаюЖильё 🏨
📍В: #Тбилиси
ℹ️Описание: frfrfrfr
🗺Геолокация: не указана
🐶Животные: #ПоДоговорённости 📞
💰Цена: От 2000руб.  Разные варианты номеров
🔎Сдаёт: #Хозяин

📲Контакты: 995593445606 @EDEM99TBILISI, ИРИНА, #id5021553278

🖼Больше фото смотрите в комментариях под объявлением.
*️⃣Нажмите на название города для фильтра объявлений.

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

☑️Больше объявлений на @arenda_ge`,
		`АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ, [18.07.2022 19:01]
[ Photo ]
👤Я: #СдаюЖильё 🏨
📍В: #Уреки
ℹ️Описание: Отель David Palace Ureki расположен в курортном поселке Уреки, в 100 метрах от пляжа. В отеле работают ресторан, бесплатная частная парковка и общий лаундж. Гостям предоставляются принадлежности для барбекю. Номер стандарт- 120лари
Полулюкс- 150 лари
Люкс двухкомнатный -180
🗺Геолокация: не указана
🐶Животные: #ПоДоговорённости 📞
💰Цена: 120-180 лари
🔎Сдаёт: #Хозяин

📲Контакты:  , Алеся, #id1770253123

🖼Больше фото смотрите в комментариях под объявлением.
*️⃣Нажмите на название города для фильтра объявлений.

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

☑️Больше объявлений на @arenda_ge

АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ, [18.07.2022 19:01]
[ Photo ]
👤Я: #СдаюЖильё 🏨
📍В: #Тбилиси
ℹ️Описание: Sssssssss
🗺Геолокация: не указана
🐶Животные: #ПоДоговорённости 📞
💰Цена: От 2000руб.  Разные варианты номеров
🔎Сдаёт: #Хозяин

📲Контакты: 995593445606 @EDEM99TBILISI, ИРИНА, #id5021553278

🖼Больше фото смотрите в комментариях под объявлением.
*️⃣Нажмите на название города для фильтра объявлений.

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

☑️Больше объявлений на @arenda_ge`,
		`АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ, [18.07.2022 18:59]
👤Я: #ИщуЖильё 🙂
📍В: Тбилиси
💡Инфо: Ищу квартиру для аренды, с 26 июля по 8 августа.
Собаки нет, до двух людей.
Расположение - центр города. До 25$ сутки.
🐶Животные с собой: Нет ❌
💵Интересует цена: 25$

📲Контакты:  @LashaSPB, Лаша Мчедлидзе, #id473732677

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ, [18.07.2022 19:01]
[ Photo ]
👤Я: #СдаюЖильё 🏨
📍В: #Уреки
ℹ️Описание: Отель David Palace Ureki расположен в курортном поселке Уреки, в 100 метрах от пляжа. В отеле работают ресторан, бесплатная частная парковка и общий лаундж. Гостям предоставляются принадлежности для барбекю. Номер стандарт- 120лари
Полулюкс- 150 лари
Люкс двухкомнатный -180
🗺Геолокация: не указана
🐶Животные: #ПоДоговорённости 📞
💰Цена: 120-180 лари
🔎Сдаёт: #Хозяин

📲Контакты:  , Алеся, #id1770253123

🖼Больше фото смотрите в комментариях под объявлением.
*️⃣Нажмите на название города для фильтра объявлений.

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

☑️Больше объявлений на @arenda_ge

АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ, [18.07.2022 19:01]
[ Photo ]
👤Я: #СдаюЖильё 🏨
📍В: #Тбилиси
ℹ️Описание: kkkkkkkkk
🗺Геолокация: не указана
🐶Животные: #ПоДоговорённости 📞
💰Цена: От 2000руб.  Разные варианты номеров
🔎Сдаёт: #Хозяин

📲Контакты: 995593445606 @EDEM99TBILISI, ИРИНА, #id5021553278

🖼Больше фото смотрите в комментариях под объявлением.
*️⃣Нажмите на название города для фильтра объявлений.

📮Отправлено через: @KrayZemliBot (https://t.me/KrayZemliBot?start=arenda_ge)

☑️Больше объявлений на @arenda_ge`,
	],
	// Тбилиси Объявления, Недвижимость, Аренда 1377602081
	1377602081: [
		`⬆️
01746
#Ваке #Выше800 
📍 Ул. Атени 6/8
✅️ 72м²
✅️ 2 Спальни 3 Комнаты
✅️ 5/16 Этаж
✅️ 2 Балкона (Красивый Вид)
✅️ Посудомойка
🐕 Можно с питомцем (500$ Депозит)
Цена $1250
По вопросам обращайтесь 👇
@Just_Rafael`,
		`⬆️
01748
#Ваке #Выше800 
📍 Ул. Атени 16А
🏣 Новостройка
✅️ 48м²
✅️ 4/22 Этаж
✅️ 1 Комната 2 Спальни
✅️ Посудомойка
✅️ Необжитая
✅️ Балкон 3м²
⚠️ Аренда на год!
⚠️ Без Питомцев!
Цена $1300
По вопросам обращайтесь 👇
@Just_Rafael`,
		`⬆️
01747
#Ваке #Выше800 
📍 Ул. Марабда 34
🏣 Новостройка
✅️ 103м²
✅️ 2 Спальни 3 Комнаты
✅️ Балкон
✅️ Красивый Вид
✅️ 3/4 Этаж
✅️ Необжитая
⚠️ Без Питомцев
Цена $1000
По вопросам обращайтесь 👇
@Just_Rafael`,
		`Тбилиси Объявления, Недвижимость, Аренда, [18.07.2022 16:10]
[ Photo ]
⬆️
01746
#Ваке #Выше800 
📍 Ул. Атени 6/8
✅️ 72м²
✅️ 2 Спальни 3 Комнаты
✅️ 5/16 Этаж
✅️ 2 Балкона (Красивый Вид)
✅️ Посудомойка
🐕 Можно с питомцем (500$ Депозит)
Цена $1250
По вопросам обращайтесь 👇
@Just_Rafael`,
		`Тбилиси Объявления, Недвижимость, Аренда, [18.07.2022 12:47]
[ Album ]
🔆01745
#Ваке #выше800 
📍Ул. Кипшидзе 12
✅ 65 м²
✅ 2 Комнаты 1 Спальня 
✅ 9/16 Этаж
✅ Балкон 
Цена: 900$
⚠️ Сдаётся минимум на полгода 
🦮 Можно с питомцем 
По вопросам обращайтесь 👇
https://t.me/Khuro01

Тбилиси Объявления, Недвижимость, Аренда, [18.07.2022 16:10]
[ Photo ]
⬆️
01746
#Ваке #Выше800 
📍 Ул. Атени 6/8
✅️ 72м²
✅️ 2 Спальни 3 Комнаты
✅️ 5/16 Этаж
✅️ 2 Балкона (Красивый Вид)
✅️ Посудомойка
🐕 Можно с питомцем (500$ Депозит)
Цена $1250
По вопросам обращайтесь 👇
@Just_Rafael`,
	],
	// Tbilisi apartment rent 1751740207
	1751740207: [
		`🏢Квартира в аренду
🗺 Адрес: Улица Арагви (Вера)
💵Цена: 1250$
⭕️комната:4
⭕️Количество спален:3
⭕️Ванная комната:2
⭕️Квадратный метр:122
🏨этаж:(1)6
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Aragvi street (Vera)
💵Price: 1250$
⭕️Rooms:4
⭕️Bedroom amount:3
⭕️Bathroom:2
⭕️Square meter:122
🏨Floor:(1)6
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments`,
		`Tbilisi apartment rent, [18.07.2022 18:02]
[ Album ]
🏢Квартира в аренду
🗺 Адрес:Улица Гурамишвили (Санзона)
💵Цена:900$
⭕️комната:4
⭕️Количество спален:2
⭕️Ванная комната:1
⭕️Квадратный метр:100
🏨этаж:(17)17
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Guramishvili street (Sanzona)
💵Price:900$
⭕️Rooms:4
⭕️Bedroom amount:2
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(17)17
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments`,
		`Tbilisi apartment rent, [18.07.2022 18:00]
[ Album ]
🏢Квартира в аренду
🗺 Адрес: Меурнеоба Варкетили (Варкетили)
💵Цена:400$
⭕️комната:4
⭕️Количество спален:3
⭕️Ванная комната:1
⭕️Квадратный метр: 100
🏨этаж: (2)9
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Varketili Meurneoba (Varketili)
💵Price:400$
⭕️Rooms:4
⭕️Bedroom amount:3
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(2)9
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments

Tbilisi apartment rent, [18.07.2022 18:02]
[ Album ]
🏢Квартира в аренду
🗺 Адрес:Улица Гурамишвили (Санзона)
💵Цена:900$
⭕️комната:4
⭕️Количество спален:2
⭕️Ванная комната:1
⭕️Квадратный метр:100
🏨этаж:(17)17
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Guramishvili street (Sanzona)
💵Price:900$
⭕️Rooms:4
⭕️Bedroom amount:2
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(17)17
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments`,
		`Tbilisi apartment rent, [18.07.2022 17:59]
[ Album ]
🏢Квартира в аренду
🗺 Адрес: Улица Мамиа Аласании (Ведзиси)
💵Цена: 1300$
⭕️комната:3
⭕️Количество спален:2
⭕️Ванная комната:2
⭕️Квадратный метр:130
🏨этаж:(3)6
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address:Mamia Alasania street (Vedzisi)
💵Price:1300$
⭕️Rooms:3
⭕️Bedroom amount:2
⭕️Bathroom:2
⭕️Square meter:130
🏨Floor:(3)6
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments

Tbilisi apartment rent, [18.07.2022 18:00]
[ Album ]
🏢Квартира в аренду
🗺 Адрес: Меурнеоба Варкетили (Варкетили)
💵Цена:400$
⭕️комната:4
⭕️Количество спален:3
⭕️Ванная комната:1
⭕️Квадратный метр: 100
🏨этаж: (2)9
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Varketili Meurneoba (Varketili)
💵Price:400$
⭕️Rooms:4
⭕️Bedroom amount:3
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(2)9
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments

Tbilisi apartment rent, [18.07.2022 18:02]
[ Album ]
🏢Квартира в аренду
🗺 Адрес:Улица Гурамишвили (Санзона)
💵Цена:900$
⭕️комната:4
⭕️Количество спален:2
⭕️Ванная комната:1
⭕️Квадратный метр:100
🏨этаж:(17)17
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Guramishvili street (Sanzona)
💵Price:900$
⭕️Rooms:4
⭕️Bedroom amount:2
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(17)17
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments`,
		`Tbilisi apartment rent, [18.07.2022 17:58]
[ Album ]
🏢Квартира в аренду
🗺 Адрес:Улица Кутателидзе (Мтацминда)
💵Цена:1050$
⭕️комната:3
⭕️Количество спален:2
⭕️Ванная комната:2
⭕️Квадратный метр:125
🏨этаж:(5)5
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Kutatelidze street (Mtatsminda)
💵Price:1050$
⭕️Rooms:3
⭕️Bedroom amount:2
⭕️Bathroom:1
⭕️Square meter:125
🏨Floor:(5)5
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments

Tbilisi apartment rent, [18.07.2022 17:59]
[ Album ]
🏢Квартира в аренду
🗺 Адрес: Улица Мамиа Аласании (Ведзиси)
💵Цена: 1300$
⭕️комната:3
⭕️Количество спален:2
⭕️Ванная комната:2
⭕️Квадратный метр:130
🏨этаж:(3)6
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address:Mamia Alasania street (Vedzisi)
💵Price:1300$
⭕️Rooms:3
⭕️Bedroom amount:2
⭕️Bathroom:2
⭕️Square meter:130
🏨Floor:(3)6
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments

Tbilisi apartment rent, [18.07.2022 18:00]
[ Album ]
🏢Квартира в аренду
🗺 Адрес: Меурнеоба Варкетили (Варкетили)
💵Цена:400$
⭕️комната:4
⭕️Количество спален:3
⭕️Ванная комната:1
⭕️Квадратный метр: 100
🏨этаж: (2)9
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Varketili Meurneoba (Varketili)
💵Price:400$
⭕️Rooms:4
⭕️Bedroom amount:3
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(2)9
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments

Tbilisi apartment rent, [18.07.2022 18:02]
[ Album ]
🏢Квартира в аренду
🗺 Адрес:Улица Гурамишвили (Санзона)
💵Цена:900$
⭕️комната:4
⭕️Количество спален:2
⭕️Ванная комната:1
⭕️Квадратный метр:100
🏨этаж:(17)17
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @Ismail_Agency Tel: 579336627
📧 office.tghome@gmail.com 
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments


🏢Apartament for Rent
🗺Address: Guramishvili street (Sanzona)
💵Price:900$
⭕️Rooms:4
⭕️Bedroom amount:2
⭕️Bathroom:1
⭕️Square meter:100
🏨Floor:(17)17
First and last month payment is required
if you are interested please contract following contact: @Ismail_Agency Tel: 579336627
Instagram: tbilisi_rent_sell Facebook: Tghomerealestateagency Tiktok: tbilisiapartments`,
	],
	// Аренда квартир Тбилиси 1513001857
	1513001857: [
		`Saburtalo Bidzina Kvernadze St
https://maps.app.goo.gl/SeQQv2HazcoTA1Kv8
🏢 Капртира в аренду
    750$ ( dlia vcex) mojno s pitomcami + depozit 500$
⭕️комната: 2
⭕️Количество спален: 1
⭕️Ванная комната: 1
⭕️Квадратный метр: 65
🏨этаж;14(24)min 6 mesiacev
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @ApartmentTbilisi
@Tekleshamatava`,
		`Saburtalo Tbilisi Sports Palace
https://maps.app.goo.gl/z7xc5riKqoDiFDhY8
🏢 Квартира в аренду
    600$ (  dla vcex)  mojno s pitomcami + depozit( bez balkona
⭕️комната: 2
⭕️Количество спален: 1
⭕️Ванная комната: 1
⭕️Квадратный метр: 50
🏨этаж;2 min 12 mesiacev
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @ApartmentTbilisi
@Tekleshamatava`,
		`Saburtalo Tbilisi Sports Palace
https://maps.app.goo.gl/z7xc5riKqoDiFDhY8
🏢 Квартира в аренду
    650$ (  dla vcex)  mojno s pitomcami + depozit( bez balkona
⭕️комната: 2
⭕️Количество спален: 1
⭕️Ванная комната: 1
⭕️Квадратный метр: 50
🏨этаж;2 min 12 mesiacev
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @ApartmentTbilisi
@Tekleshamatava`,
		`Saburtalo Tbilisi Sports Palace
https://maps.app.goo.gl/z7xc5riKqoDiFDhY8
🏢 Квартира в аренду
    600$ (  dla vcex)  mojno s pitomcami + depozit( bez balkona
⭕️комната: 2
⭕️Количество спален: 1
⭕️Ванная комната: 1
⭕️Квадратный метр: 50
🏨этаж;2 min 12 mesiacev
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @ApartmentTbilisi
@Tekleshamatava`,
		`Saburtalo Tbilisi Sports Palace
https://maps.app.goo.gl/z7xc5riKqoDiFDhY8
🏢 Квартира в аренду
    550$ (  dla vcex)  mojno s pitomcami + depozit( bez balkona
⭕️комната: 2
⭕️Количество спален: 1
⭕️Ванная комната: 1
⭕️Квадратный метр: 45
🏨этаж;2 min 12 mesiacev
Требуется оплата за первый и последний месяц
если вы заинтересованы, пожалуйста, свяжитесь: @ApartmentTbilisi
@Tekleshamatava`,
	],
	// 🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑 1170680593
	1170680593: [
		`🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑, [18.07.2022 18:45]
Вака
Тактакишвили 5 
5 Otar Taktakishvili St
https://maps.app.goo.gl/nkhkCQ1N5ush6Y1u8
Старый корпус 
85м2 
Балкон 
3/5 этаж 
Нет лифта 
1 сан узел 
1 спальня
Духовка 
Посудомойка 
Можно все 
Можно с животным 
Цена:1200$`,
		`🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑, [18.07.2022 14:48]
Ваке  
Ул. Марабда 34

https://goo.gl/maps/iwjbttCXNVMCmPW87

Новый корпус
103 кв
3/4 этаж
2 спальни
Ванна
Балкон
Нет лифта
Можно всем
Нельзя с питомцами
Цена 1000$`,
		`🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑, [18.07.2022 14:04]
Вера  
Ул. Мачавариани 4

https://goo.gl/maps/J7czrhg6AAXrqH8V6

Новый корпус
122 кв
1/6 этаж
3 спальни
Балкон
Не готовы заселить граждан Украины (извините, не наша позиция)
Можно с питомцами
Цена 1250 $`,
		`🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑, [18.07.2022 13:36]
Вера  
Ул. Човелидзе 8

https://goo.gl/maps/928LnCQaWfSR6xBt8

Новый корпус
155 кв
7/10 этаж
3 спальни
2 санузла
Ванна
Балкон
Веранда
Можно всем
Нельзя с питомцами
Цена 1600$`,
		`🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑, [18.07.2022 12:44]
Ваке  
Ул. Жвания 73

https://goo.gl/maps/yKEcsjgEkS7VXbQn7

Новый корпус
100 кв
4/7 этаж
2 спальни
Веранда
Паркинг
Есть лифт
Можно всем
Можно с питомцами
Цена 1000$`,
	],
	// АРЕНДА ТБИЛИСИ🏚 1748218743
	1748218743: [
		`Сдается 3-х комнатная квартира. Район Сабуртало ул Костава 80

✅ Новостройка, новый ремонт 
✅площадь-85м2
✅Спален-2
✅мебель ,техника,микроволновка духовка, центральное отопления
✅Сан/узел-1
✅этаж-18/21
✅цена-1300$

 🐶🐱 животные  допускаются`,
		`Ваке. Ул. Рамишвили
Комнаты - 2
Спальни - 1
Санузел - 1 
Балкон - 1 
Этаж - 8/13
Общая площадь - 65 кв 
✅ цена - 1200 $`,
		`Сабуртало . Улица Б. Жгенти
Комнаты - 3 
Спальни - 2 
Санузел - 1 
Балкон - 1 
Общая площадь - 90 кв 
✅ цена - 950 $`,
		`Сабуртало . Ж/ К Shartava Pool House . 
Комнаты - 2 
Спальни - 1
Санузел - 1 
Общая площадь - 75 кв 
Этаж - 7/22
Балкон - 8 м
В корпусе 2 бассейна ( открытие июнь, тренажёрный зал) 
В квартире есть кондиционер , духовка , микроволновка , посудомойка , вся необходимая новая посуда . 
Квартира очень красивая ❤️‍🔥
✅ цена - 1500$`,
		`Сабуртало . Улица Алексидзе 13
Пентхаус 🔥
Комнаты - 3 
Спальни - 2 
Санузел - 2 
Веранда 
Общая площадь - 110 кв 
Вся необходимая техника . 
Этаж - 19/19
✅ цена - 2000 $ ( в случае оплаты за неск месяцев , цена ниже)`,
	],
	// Тбилиси 🏡 Аренда | Продажа | Недвижимость | Жилье | Квартиры 1356271391
	1356271391: [
		`Квартира в аренду на год на 
Tornike eristavi 1,  3 минуты от метро Дидубе.
Этаж 12 
60 м2, 2 спальни, в одной спальне нет окна. 
Окна в гостиной и в спальне в пол панорамные. Вид панорамный на город и гору. На 1 этаже дома имеется супермаркет. 

600$ в месяц на год

✉️ Для связи — @my_tbilisi_bot

#аренда #дидубе #от500до700`,
		`Didi digomi, mirian mefe 8, 4 этаж
67 кв.м.  2 спальни
1 балкон
 Центральное отопление

 500$ в месяц на год 

✉️ Для связи - @my_tbilisi_bot

➡️ Наш канал - @tbilisi_apartments 

#дигоми #аренда #от500до700`,
		`СДАНА
🔥🔥🔥Квартира с новым ремонтом мебелью и техникой в Сабуртало, ул. Отара Лорткипанидзе

🔸180 кв.м, 3 спальни + гостиная + изолированная кухня + ТЕРРАСА НА КРЫШЕ 200 кв.м. С газоном, с видом на горы и город.
🔸2 санузла(один с ванной), 2 подсобных помещения, гардеробная. 

🔸1400$ в месяц на год!
❗️Сдается срочно, до 21 июня

✉️ Для связи — @myapartments_bot 

🏡 Жилье в Тбилиси - @tbilisi_apartments

#аренда #сабуртало #от1000`,
		`🔥Цена снижена!
Элитная квартира в жилом комплексе в Ваке
Улица Нино Жвания

3 спальни
3 санузла
Гардеробная
Балкон
175 м2
Отделка из дорогих импортных материалов
2/7 этаж
Высокие потолки
Круглосуточная охрана и видеонаблюдение на территории
Есть несколько похожих квартир, можно выбрать

2000$ 2500$ в месяц на год

✉️ Для связи — @my_tbilisi_bot

🏡 Жилье в Тбилиси - @tbilisi_apartments

#аренда #ваке #от1000`,
		`Стильная красивая квартира у метро 300 арагвинцев
Убилава, 5

2 спальни
Гардеробная
2 балкона
Вся необходимая техника: посудомойка, стиралка
❗️В стоимость входит уборка раз в неделю
4/4 этаж
🐕 Можно с питомцами под залог

1300$ в месяц на год

✉️ Для связи — @my_tbilisi_bot

#аренда #авлабари #от1000`,
	],
};

// const message = {
// 	CONSTRUCTOR_ID: 1656358105,
// 	SUBCLASS_OF_ID: 2676568142,
// 	className: 'UpdateNewChannelMessage',
// 	classType: 'constructor',
// 	message: {
// 		CONSTRUCTOR_ID: 940666592,
// 		SUBCLASS_OF_ID: 2030045667,
// 		className: 'Message',
// 		classType: 'constructor',
// 		out: false,
// 		mentioned: false,
// 		mediaUnread: false,
// 		silent: false,
// 		post: true,
// 		fromScheduled: false,
// 		legacy: false,
// 		editHide: false,
// 		ttlPeriod: null,
// 		id: 8953,
// 		fromId: null,
// 		peerId: {
// 			CONSTRUCTOR_ID: 2728736542,
// 			SUBCLASS_OF_ID: 47470215,
// 			className: 'PeerChannel',
// 			classType: 'constructor',
// 			channelId: [Integer]
// 		},
// 		fwdFrom: null,
// 		viaBotId: null,
// 		replyTo: null,
// 		date: 1654984351,
// 		message: '',
// 		media: {
// 			CONSTRUCTOR_ID: 1766936791,
// 			SUBCLASS_OF_ID: 1198308914,
// 			className: 'MessageMediaPhoto',
// 			classType: 'constructor',
// 			flags: 1,
// 			photo: [Object],
// 			ttlSeconds: null
// 		},
// 		replyMarkup: null,
// 		entities: null,
// 		views: 1,
// 		forwards: 0,
// 		replies: null,
// 		editDate: null,
// 		pinned: false,
// 		postAuthor: null,
// 		groupedId: { value: 13239874810309226n },
// 		restrictionReason: null,
// 		action: undefined,
// 		noforwards: false,
// 		reactions: null,
// 		flags: 148992
// 	},
// 	pts: 10427,
// 	ptsCount: 1
// }
