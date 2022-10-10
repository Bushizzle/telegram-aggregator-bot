import * as TelegramBot from 'node-telegram-bot-api';
import { TUser, TApi } from '../types';

type TStorageState = {
  api?: TApi;
  users?: TUser[];
  channels?: number[];
  bot?: TelegramBot;
  admin?: string;
};

export type TStorage = {
  state: { [key: string]: any };
  setItem(key: string | number, value: TStorageState[keyof TStorageState]): void;
  getItem(key: string | number): TStorageState[keyof TStorageState];
};

const dumbStorage: TStorage = {
  state: {},
  setItem(key, value): void {
    this.state[String(key)] = value;
  },
  getItem(key) {
    return this.state[String(key)];
  },
};

export class Storage {
  public static init = () => (global.storage = dumbStorage);

  public static setApi(key: keyof TApi, value: string) {
    global.storage.setItem('api', {
      ...Storage.api,
      [key]: value,
    });
  }
  public static get api(): TApi {
    return global.storage.getItem('api') as TApi;
  }

  public static set users(users: TUser[]) {
    global.storage.setItem('users', users);
  }
  public static get users(): TUser[] {
    return global.storage.getItem('users') as TUser[];
  }

  public static set channels(channels: number[]) {
    global.storage.setItem('channels', channels);
  }
  public static get channels(): number[] {
    return global.storage.getItem('channels') as number[];
  }

  public static set bot(bot: TelegramBot) {
    global.storage.setItem('bot', bot);
  }
  public static get bot() {
    return global.storage.getItem('bot') as TelegramBot;
  }

  public static set admin(id: string) {
    global.storage.setItem('admin', id);
  }
  public static get admin(): string {
    return global.storage.getItem('admin') as string;
  }
}
