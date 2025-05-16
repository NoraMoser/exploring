import React from "react";
import { Country } from "../types/Country";

type CountryRowProps = {
  country: Country;
  //singld country object from the array of countries
  onSelectCountry: (code: string) => void;
  //function to set the specific country by the country code used with the handlekeydown function so the user can use the keyboard to select
};

const CountryRow: React.FC<CountryRowProps> = ({
  country,
  onSelectCountry,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    //want to make sure you can do everything by keyboard and hitting enter and not just mouse for accessibility
    if (e.key === "Enter") {
      onSelectCountry(country.cca3);
    }
  };

  return (
    <tr
      tabIndex={0}
      onClick={() => onSelectCountry(country.cca3)}
      onKeyDown={handleKeyDown}
      style={{ cursor: "pointer" }}
      aria-label={`view details for ${country.name.common}`} //for screen readers ti be able to access
      data-testid={`row-${country.cca3}`} //help with testing
    >
      <td data-label="Common Name" title={country.name.common}>
        {country.name.common}
      </td>
      <td data-label="Official Name" title={country.name.official}>
        {country.name.official ?? "N/A"}
        {/* in case some countries do not have an official name */}
      </td>
    </tr>
  );
};

export default CountryRow;
