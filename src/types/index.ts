export { TUser, TUserSettings, TUserNotifications } from './user';

export type TApi = {
  usersLambda: string;
};

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

enum TAptProps {
  price = 'price',
  district = 'district',
  geo = 'geo',
  address = 'address',
  pets = 'pets',
  balcony = 'balcony',
  bedrooms = 'bedrooms',
  rooms = 'rooms',
  floor = 'floor',
  size = 'size',
  owner = 'owner',
  text = 'text',
  contacts = 'contacts',
  agent = 'agent',
  bathrooms = 'bathrooms',
}

export type TAptData = {
  [key: string]: TAptProps[keyof TAptProps];
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
