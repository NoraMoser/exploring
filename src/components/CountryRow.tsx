import React from "react";
import { Country } from "../types/Country";

type CountryRowProps = {
  country: Country;
  onSelectCountry: (id: string) => void;
};

const CountryRow: React.FC<CountryRowProps> = ({
  country,
  onSelectCountry,
}) => {
  return (
    <tr onClick={() => onSelectCountry(country.cca3)} style={{ cursor: "pointer" }}>
      <td data-label="Flag">
        <img className="flag-image" src={country.flags.svg} alt={`${country.name.common} flag`} />
      </td>
      <td data-label="Common Name">{country.name.common}</td>
      <td data-label="Official Name">{country.name.official}</td>
      <td data-label="Region">{country.region}</td>
      <td data-label="Population">{country.population.toLocaleString()}</td>
      <td data-label="Languages">
        {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
      </td>
    </tr>
  );
};

export default CountryRow;
