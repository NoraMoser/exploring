import { Country } from "../types/Country";

const BASE_URL = "https://restcountries.com/v3.1";
//you can find these endpoints at https://restcountries.com/#endpoints

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error("Unable to fetch countries");
  }
  return await response.json();
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!response.ok) {
    throw new Error("Unable to fetch country");
  }
  const data = await response.json();
  return data[0];
};
