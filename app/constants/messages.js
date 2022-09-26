const ERR_SERVER = 'Что-то пошло не так, простите';
const ERR_DUPLICATE = 'А вы уже подписаны';
const ERR_NOT_SUBSCRIBED = 'Так вы и не подписаны еще';
const ERR_NO_USER = 'Сначала вы подпишитесь, а потом уж настраивайте фильтры';

const SUCCESS_SUBSCRIBE = 'Подписка активирована';
const SUCCESS_UNSUBSCRIBE = 'Вы отписались, я не обиделся';

const MSG_ABOUT = 'Этот бот подписан на каналы с объявлениями о сдаче квартир в Тбилиси: он сортирует их по категориям и выдает вам то, на что вы подпишитесь. По сути, он снимает с вас необходимость мониторить 8-10 каналов, он делает это за вас и шлет вам только то, что вам интересно';

const WELCOME_START = 'Привет! Этот бот мониторит каналы и присылает тебе новые объявления из них. Настрой его командой /set. Для более подробной информации жми /help';
const WELCOME_CONFIGURATION = 'Отлично! Сейчас ты настроишь фильтры по цене и району, чтобы бот слал тебе только нужные объявления';

module.exports = {
  ERR_SERVER,
  ERR_DUPLICATE,
  ERR_NOT_SUBSCRIBED,
  SUCCESS_SUBSCRIBE,
  SUCCESS_UNSUBSCRIBE,
  ERR_NO_USER,
  MSG_ABOUT,
  WELCOME_START,
  WELCOME_CONFIGURATION,
};
