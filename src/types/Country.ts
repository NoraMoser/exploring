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
    };
    languages?: { [code: string]: string };
}