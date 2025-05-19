import React from "react";
import { Country } from "../types/Country";
import { useFavorites } from "../contexts/FavoritesContext";

type CountryDetailInfoProps = {
  country: Country;
  //single country object from the array of countries
};
const CountryDetailInfos: React.FC<CountryDetailInfoProps> = ({ country }) => {
  //gives the countries info that is given from the api
  const { addFavorite, favorites, removeFavorite } = useFavorites();
  //so we are getting these because we defined it in the context

  const isFavorite = favorites.some((item) => item.cca3 === country.cca3);
  //basically checking that the new country is included> yay or nay

  return (
    <section
      className="country-detail-information"
      aria-labelledby="country-details-heading"
    >
      <div>
        {country.coatOfArms?.svg && country.coatOfArms.svg.trim() !== "" && (
          <img
            className="coat-of-arms-image"
            src={country.coatOfArms.svg}
            alt={`The coat of arms for the country ${country.name.common}`}
          />
        )}
        {/* this is so if the svg is an empty string, the img is not rendered */}

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
          {country.languages && Object.keys(country.languages).length > 0 //empty obj in js is truthy so gotta do .length
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>

        <p>
          <strong>Population: </strong>
          {country.population > 0 ? country.population.toLocaleString() : "N/A"}
        </p>

        <p>
          <strong>Area: </strong>
          {country.area ? `${country.area.toLocaleString()} km²` : "N/A"}
        </p>

        {/* loop through the currency object and show name and symbol */}
        {Object.keys(country.currencies).length > 0 ? (
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

      <div className="favorite-button-wrapper">
        <span id="favorite-label">
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}{" "}
        </span>
        <button
          onClick={() => {
            isFavorite ? removeFavorite(country.cca3) : addFavorite(country);
          }}
          aria-labelledby="favorite-label"
          aria-pressed={isFavorite}
        >
          {isFavorite ? "🩶" : "❤️"}
        </button>
      </div>
    </section>
  );
};

export default CountryDetailInfos;
