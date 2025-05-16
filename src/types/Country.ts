//got types from https://restcountries.com/v3.1/all
//these are all the items i get back from the country array
export interface Country {
  name: {
    common: string; //common name of country
    official: string; // official name of country
  };
  cca3: string; //this si the country code
  capital?: string[]; //capital of country
  region: string; //region where country is located
  subregion?: string; //optional subregion (some countries do not have this)
  population: number; //how many people are in the country
  flags: {
    svg: string; //image of countries flag
    alt: string; //description of countries flag
  };
  maps: {
    googleMaps: string; //url to google maps
    openStreetMaps: string; //url to street view
  };
  languages: { [code: string]: string }; // all the languages spoken officially in the country
  latlng: [number, number]; //latitude and longitude -leaflet requires an array w/ 2 numbers
  coatOfArms: {
    svg: string; //image of the official coat of arms
  };
  area: number; //area of the country
  currencies: { //currencies of country- can be more than one
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[]; //timezones of country
  continents: string[]; //continent country is in
}
