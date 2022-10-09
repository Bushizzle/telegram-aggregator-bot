import { botMessageHandler } from './actions';
import { botQueryHandler } from './queries';

export const botSetup = (): void => {
  global.bot.on('message', msg => botMessageHandler(msg));
  global.bot.on('callback_query', callbackQuery => botQueryHandler(callbackQuery));
};
