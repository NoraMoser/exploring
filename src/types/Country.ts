//got types from https://restcountries.com/v3.1/all

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string; //this si the country code
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  languages: { [code: string]: string };
  latlng: [number, number]; //leaflet requires an array w/ 2 numbers
  coatOfArms: {
    svg: string;
  };
  area: number;
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[];
  continents: string[];
}
