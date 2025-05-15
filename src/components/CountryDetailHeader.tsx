import React from "react";
import { Country } from "../types/Country";
import { useNavigate } from "react-router-dom";

type CountryDetailHeaderProps = {
  country: Country;
  //single country object from the array of countries
};

const CountryDetailHeader: React.FC<CountryDetailHeaderProps> = ({
  country,
}) => {
  const navigate = useNavigate();
  //this is part of react router so we can go back a page
  return (
    <nav className="country-detail-nav-bar">
      <div>
        <button onClick={() => navigate(-1)}>←</button>
        <h1>{country.name.common}</h1>
        <img
          className="flag-image"
          src={country.flags?.svg}
          alt={country.flags?.alt}
        />
      </div>
    </nav>
  );
};

export default CountryDetailHeader;
