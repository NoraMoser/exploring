import {Country} from '../types/Country'

const BASE_URL = 'https://restcountries.com/v3.1'

export const fetchAllCountries = async (): Promise<Country[]> => {
    const response = await fetch(`${BASE_URL}/all`)
    if (!response.ok){
        throw new Error('Unable to fetch countries')
    }
    return await response.json()
}

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
    const response = await fetch(`${BASE_URL}/name/${name}`)
    //you can find more endpoints at https://restcountries.com/#api-endpoints-v3-all
    if (!response.ok){
        throw new Error('Unable to fetch country')
    }
    const data = await response.json();
    return data[0] 
}

export const fetchCountryByCode = async (code: string): Promise<Country[]> => {
    const response = await fetch(`${BASE_URL}/alpha/${code}`)
    if (!response.ok){
        throw new Error('Unable to fetch country')
    }
    const data = await response.json();
    return data[0] 
}