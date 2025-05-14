import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import CountryRow from "../components/CountryRow";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../services/countriesAPI";
import { useNavigate } from "react-router-dom";

function Home() {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  });
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries.</p>;

  function handleSelectCountry(id: string) {
    navigate(`/country/${id}`)
    //passing this id in the url which i have defined in the react router
  }

  function handleSearchInput(name: string) {
    setQuery(name);
  }

  return (
    <div className="table-container">
      <FilterBar query={query} setQuery={handleSearchInput}/>
      <table className="country-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Official Name</th>
            <th>Region</th>
            <th>Population</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>
          {countries?.map((country) => (
            <CountryRow
              key={country.cca3}
              country={country}
              onSelectCountry={handleSelectCountry}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
