import { LocalStorage } from 'node-localstorage';
import * as TelegramBot from 'node-telegram-bot-api';
export {};

declare global {
  var storage: LocalStorage;
  var bot: TelegramBot;
}
