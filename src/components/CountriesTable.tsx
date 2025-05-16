import React from "react";
import { Country } from "../types/Country";
import CountryRow from "./CountryRow";
import { useNavigate } from "react-router-dom";

type CountriesTableProps = {
  filteredCountries: Country[];
  // Filtered list of countries used in the table
  currentPage: number;
  //the current page the user is on (changes when they push the prev or next buttons)
  amtCountriesPerPage: number;
  //amount of items in the list that are displayed at one time
};

const CountriesTable: React.FC<CountriesTableProps> = ({
  filteredCountries,
  currentPage,
  amtCountriesPerPage,
}) => {
  const navigate = useNavigate();

  const indexOfFirstCountry = currentPage * amtCountriesPerPage;
  const indexOfLastCountry = indexOfFirstCountry - amtCountriesPerPage;
  //these are for the pagination so that we know where to slice- cannot slice immediately bc it messes up the pagination total pages so just do it before we list

  const handleSelectCountry = (code: string) => {
    navigate(`/country/${code}`);
    //passing this country code in the url which i have defined in the react router - in app.tsx
  };

  return (
    <table role="presentation"  className="country-table">
      <thead>
        <tr>
          <th>Common Name</th>
          <th>Official Name</th>
        </tr>
      </thead>
      <tbody>
        {filteredCountries.length > 0 ? (
          filteredCountries
            .slice(indexOfLastCountry, indexOfFirstCountry)
            .map((country) => (
              <CountryRow
                key={country.cca3}
                country={country}
                onSelectCountry={handleSelectCountry}
              />
            ))
        ) : (
          <tr>
            <td colSpan={2} style={{ textAlign: "center", padding: "1rem" }}>
              Sorry, no countries found.
            </td>
          </tr>
          // In case the user searches for a country that is not there
        )}
      </tbody>
    </table>
  );
};
//this is the list of all the countries displayed in a table
export default CountriesTable;
