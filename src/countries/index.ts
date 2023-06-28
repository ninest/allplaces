export interface Country {
  name: {
    common: string;
    official: string;
    native: {
      [x: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [x: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    nld: string;
    pap: string;
  };
  translations: {
    [x: string]: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  flag: string;
  demonyms: {
    [x: string]: {
      f: string;
      m: string;
    };
  };
  callingCodes: string[];
  timezones: Timezone[]
}

export interface Timezone {
  zoneName: string,
  gmtOffset: number,
  gmtOffsetName: string,
  abbreviation: string,
  tzName: string
}