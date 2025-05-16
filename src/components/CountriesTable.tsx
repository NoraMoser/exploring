import React from "react";
import { Country } from "../types/Country";
import { useNavigate } from "react-router-dom";

//component import
import CountryRow from "./CountryRow";
import ErrorBoundary from "./ErrorBoundary";

type CountriesTableProps = {
  filteredCountries: Country[];
  // Filtered list of countries used in the table
  currentPage: number;
  //the current page the user is on (changes when they push the prev or next buttons)
  amtCountriesPerPage: number;
  //amount of items in the list that are displayed at one time
};

const CountriesTable: React.FC<CountriesTableProps> = ({
  //this displays the entire array of countries in table form with filtering and pagination
  filteredCountries,
  currentPage,
  amtCountriesPerPage,
}) => {
  const navigate = useNavigate(); //navigate to a different page with react router dom

  const indexOfFirstCountry = currentPage * amtCountriesPerPage;
  const indexOfLastCountry = indexOfFirstCountry - amtCountriesPerPage;
  //these are for the pagination so that we know where to slice- cannot slice immediately bc it messes up the pagination total pages so just do it before we list

  const handleSelectCountry = (code: string) => {
    //passing this country code in the url which i have defined in the react router - in app.tsx
    navigate(`/country/${code}`); //navigates to the country detail page
  };

  return (
    <table className="country-table">
    <caption className="visually-hidden">Table listing countries common and their official names</caption> 
    {/* won't visually show but screen readers can read it */}
    <thead>
      <tr>
        <th scope="col">Common Name</th>
        <th scope="col">Official Name</th>
      </tr>
    </thead>
    <tbody>
      {filteredCountries.length > 0 ? (
        filteredCountries
          .slice(indexOfLastCountry, indexOfFirstCountry)
          .map((country) => (
            <ErrorBoundary>
              <CountryRow
                key={country.cca3}
                country={country}
                onSelectCountry={handleSelectCountry}
              />
            </ErrorBoundary>
          ))
      ) : (
        <tr>
          <td colSpan={2} style={{ textAlign: "center", padding: "1rem" }}>
            Sorry, no countries found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
};
export default CountriesTable;
