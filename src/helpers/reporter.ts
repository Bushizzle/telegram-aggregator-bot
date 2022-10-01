import * as log4js from 'log4js';
import * as TelegramBot from 'node-telegram-bot-api';

const { ADMIN_TELEGRAM_ID } = process.env;

log4js.configure({
  appenders: {
    logs: {
      type: 'file',
      filename: '../logs/logfile.log',
    },
    errors: {
      type: 'file',
      filename: '../logs/errors.log',
    },
    console: { type: 'console' },
  },
  categories: {
    console: {
      appenders: ['console'],
      level: 'all',
    },
    logs: {
      appenders: ['logs', 'console'],
      level: 'all',
    },
    errors: {
      appenders: ['errors', 'console'],
      level: 'error',
    },
    default: {
      appenders: ['errors', 'console'],
      level: 'all',
    },
  },
});

const log = log4js.getLogger('logs');
const err = log4js.getLogger('errors');
const console = log4js.getLogger('console');

export class Reporter {
  public static mapMessage(messages: any[]) {
    return messages.join('\n');
  }
  public static log(message: any) {
    log.info(message);
  }
  public static console(message: any) {
    console.info(message);
  }
  public static error(messages: any[], bot?: TelegramBot) {
    const errorText = `[ERROR]\n${Reporter.mapMessage(messages)}`;
    err.error(errorText);
    ADMIN_TELEGRAM_ID && void bot?.sendMessage(ADMIN_TELEGRAM_ID, errorText);
  }
}
