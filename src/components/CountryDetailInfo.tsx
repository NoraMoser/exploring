import React from "react";
import { Country } from "../types/Country";

type CountryDetailInfoProps = {
  country: Country;
  //single country object from the array of countries
};
const CountryDetailInfos: React.FC<CountryDetailInfoProps> = ({ country }) => {
  //gives the countries info that is given from the api
  return (
    <section
      className="country-detail-information"
      aria-labelledby="country-details-heading"
    >
      <div>
        {/* flag image with alt text for screen readers */}
        <img
          className="flag-image"
          src={country.coatOfArms?.svg}
          alt={`The coat of arms for the country ${country.name.common}`}
        />

        <h2 id="country-details-heading">
          <strong>Official Name: </strong>
          {country.name.official}
        </h2>

        <h3>
          <strong>Capital: </strong>
          {country.capital?.[0] ?? "N/A"}
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
          {country.continents?.join(", ") ?? "N/A"}
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
          {country.population?.toLocaleString() ?? "N/A"}
        </p>

        <p>
          <strong>Area: </strong>
          {country.area ? `${country.area.toLocaleString()} km²` : "N/A"}
        </p>

        {/* loop through the currency object and show name and symbol */}
        {country.currencies ? (
          Object.values(country.currencies).map((currency, index) => (
            <p key={index}>
              <strong>Currency: </strong>
              {currency.name} ({currency.symbol})
            </p>
          ))
        ) : (
          <p>
            <strong>Currency:</strong> N/A
          </p>
        )}

        <p>
          <strong>Timezone(s): </strong>
          {country.timezones?.join(", ") ?? "N/A"}
        </p>
      </div>
    </section>
  );
};

export default CountryDetailInfos;
