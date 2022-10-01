export { TUser, TUserSettings, TUserNotifications } from './user';

export type TLambdaResponse = {
  status: string;
  message: string;
  welcomed?: boolean;
};

export type TDistrict = {
  name: string;
  values: string[];
  key: number;
};

export type TPrice = {
  name: string;
  // eslint-disable-next-line no-unused-vars
  expression(n: number): boolean;
  key: number;
};

export type TAptData = {
  price: string;
  district: string;
  geo?: string;
  address?: string;
  pets?: string;
  balcony?: string;
  bedrooms?: string;
  rooms?: string;
  floor?: string;
  size?: string;
  owner?: string;
  text?: string;
  contacts?: string;
  agent?: string;
  bathrooms?: string;
};

export type TConfigKey = {
  key: keyof TAptData;
  matches: string[];
};

export type TConfigMarker = {
  key: keyof TAptData;
  matches: (string | RegExp)[];
  exceptions?: (string | RegExp)[];
};

type TConfigBase = {
  id: number;
  link: string;
  exceptions?: (string | RegExp)[];
};

export type TConfig =
  | (TConfigBase & {
      keys?: TConfigKey[];
      markers: TConfigMarker[];
    })
  | (TConfigBase & {
      keys: TConfigKey[];
      markers?: TConfigMarker[];
    });

export type TMessageData = {
  data: TAptData;
  config: TConfig;
};
