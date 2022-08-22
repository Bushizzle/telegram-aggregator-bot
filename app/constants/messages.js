const ERR_SERVER = 'Что-то пошло не так, простите';
const ERR_DUPLICATE = 'А вы уже подписаны';
const ERR_NOT_SUBSCRIBED = 'Так вы и не подписаны еще';
const ERR_NO_USER = 'Сначала вы подпишитесь, а потом уж настраивайте фильтры';

const SUCCESS_SUBSCRIBE = 'Подписка активирована';
const SUCCESS_UNSUBSCRIBE = 'Вы отписались, я не обиделся';

const MSG_ABOUT = 'Этот бот мониторит каналы с объявлениями, сортирует их по категориям и выдает вам то, на что вы подпишитесь. По сути, он снимает с вас необходимость мониторить 8-10 каналов, он делает это за вас и шлет вам только то, что вам интересно';

module.exports = {
	ERR_SERVER,
	ERR_DUPLICATE,
	ERR_NOT_SUBSCRIBED,
	SUCCESS_SUBSCRIBE,
	SUCCESS_UNSUBSCRIBE,
	ERR_NO_USER,
	MSG_ABOUT,
}
