// mockCountries.ts
import { Country } from "../types/Country"; // adjust the path if needed

export const mockCountries: Country[] = [
  {
    name: {
      common: "Canada",
      official: "Canadadada",
    },
    cca3: "CAN",
    capital: ["Ottawa"],
    region: "Americas",
    subregion: "Northern America",
    population: 38000000,
    flags: {
      svg: "https://flagcdn.com/ca.svg",
      alt: "The flag of Canada features a red maple leaf in the center with red borders on either side.",
    },
    maps: {
      googleMaps: "https://goo.gl/maps/jGnPRdZ5rfsCkS2E6",
      openStreetMaps: "https://www.openstreetmap.org/relation/1428125",
    },
    languages: {
      eng: "English",
      fra: "French",
    },
    latlng: [56.1304, -106.3468],
    coatOfArms: {
      svg: "https://mainfacts.com/media/images/coats_of_arms/ca.svg",
    },
    area: 9984670,
    currencies: {
      CAD: {
        name: "Canadian dollar",
        symbol: "$",
      },
    },
    timezones: ["UTC−08:00", "UTC−07:00", "UTC−06:00", "UTC−05:00", "UTC−04:00", "UTC−03:30"],
    continents: ["North America"],
  },
  {
    name: {
      common: "France",
      official: "French Republic",
    },
    cca3: "FRA",
    capital: ["Paris"],
    region: "Europe",
    subregion: "Western Europe",
    population: 67000000,
    flags: {
      svg: "https://flagcdn.com/fr.svg",
      alt: "The flag of France is composed of three vertical bands colored blue, white, and red.",
    },
    maps: {
      googleMaps: "https://goo.gl/maps/g7QxxSFsWyTPKuzd7",
      openStreetMaps: "https://www.openstreetmap.org/relation/1403916",
    },
    languages: {
      fra: "French",
    },
    latlng: [46.6034, 1.8883],
    coatOfArms: {
      svg: "https://mainfacts.com/media/images/coats_of_arms/fr.svg",
    },
    area: 551695,
    currencies: {
      EUR: {
        name: "Euro",
        symbol: "€",
      },
    },
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
  },
];
