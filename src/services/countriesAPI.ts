import { Country } from "../types/Country";

const BASE_URL = "https://restcountries.com/v3.1";
//you can find these endpoints at https://restcountries.com/#endpoints


/**
 * get an array of all the countries from the rest countries api
 * @returns promise resolving to an array of objects.
 * @throws error if the request fails.
 */
export const fetchAllCountries = async (): Promise<Country[]> => { 
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error("Unable to fetch countries");
  }
  return await response.json();
};

/**
 * get back an individual country per 3-letter code.
 * @param code - The country code (3 digits)
 * @returns promise resolving to a single object from the array.
 * @throws error if the request fails or country is not found.
 */
export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!response.ok) {
    throw new Error("Unable to fetch country");
  }
  const data = await response.json();
  return data[0]; //return single item from the array
};
