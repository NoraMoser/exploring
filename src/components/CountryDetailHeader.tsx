import React from "react";
import { Country } from "../types/Country";
import { useNavigate } from "react-router-dom";
//how react-router-dom navigates from one screen to the other

type CountryDetailHeaderProps = {
  country: Country;
  //single country object from the array of countries
};

const CountryDetailHeader: React.FC<CountryDetailHeaderProps> = ({
  //this is the nav bar on the individual country page
  country,
}) => {
  const navigate = useNavigate();
  //this is part of react router so we can go back to the homepage
  return (
    <header className="country-detail-nav-bar" role="banner">
      <div>
        <button
          onClick={() => navigate("/")}
          aria-label="Go back to the home page"
          title="Go back"
        >
          ←
        </button>

        <h1>{country.name.common}</h1>

        <img
          className="flag-image"
          src={country.flags?.svg}
          alt={
            country.flags?.alt
              ? country.flags.alt
              : `Flag of ${country.name.common}` //if the flag image is there, we have the regular alt describing it. if not, we say flag of wharever country in its placce.
          }
        />
      </div>
    </header>
  );
};

export default CountryDetailHeader;
