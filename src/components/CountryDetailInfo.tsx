import React from "react";
import { Country } from "../types/Country";

type CountryDetailInfoProps = {
  country: Country;
  //single country object from the array of countries
};
const CountryDetailInfos: React.FC<CountryDetailInfoProps> = ({ country }) => {
  return (
    <div className="country-detail-information">
      <div>
        <img
          className="flag-image"
          src={country.coatOfArms.svg}
          alt={`the coat of arms for the country ${country.name.common}`}
        />
        <h2>
          <strong>Official Name: </strong>
          {country.name.official}
        </h2>
        <h3>
          <strong>Capital: </strong>
          {country.capital ?? "N/A"}
        </h3>
        <h3>
          <strong>Region: </strong>
          {country.region ?? "N/A"}
        </h3>
        <h4>
          <strong>Sub-Region: </strong>
          {country.subregion ?? "N/A"}
        </h4>
        <p>
          <strong>Continent: </strong>
          {country.continents ?? "N/A"}
        </p>
      </div>
      <div>
        <p>
          <strong>Languages: </strong>
          {country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>
        <p>
          <strong>Population: </strong>
          {country.population ?? "N/A"}
        </p>
        <p>
          <strong>Area: </strong>
          {country.area ?? "N/A"}
        </p>
        {/* currencies is an array and we just want the values out of it (below) */}
        {country.currencies &&
          Object.values(country.currencies).map((currency, index) => (
            <p key={index}>
              <strong>Currency: </strong>
              {currency.name} ({currency.symbol})
            </p>
          ))}
        <p>
          <strong>Timezone(s): </strong>
          {country.timezones && country.timezones.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default CountryDetailInfos;
