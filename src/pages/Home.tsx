import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../services/countriesAPI";

//components
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import CountriesTable from "../components/CountriesTable";

const Home = () => {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  });
  //using react query here to fetch the data from the function in countriesapi
  const [query, setQuery] = useState(""); //this is the value from the search input
  const [currentPage, setCurrentPage] = useState(1);

  const amtCountriesPerPage = 10;
  const filteredCountries = useMemo(() => {
    //this caches filtered countries so it will run only with a change of one of the vars in the dependency array
    if (!countries) return [];

    const sortedCountries = countries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    ); //this puts names in alphabetical order

    const filtered = query
      ? sortedCountries.filter(
          (country) =>
            country.name.common
              .toLowerCase()
              .includes(query.trim().toLowerCase()) //no white space or upper case letters
        )
      : sortedCountries; //if the query is more than an empty string, we filter based on the countries that contain that letter

    return filtered;
  }, [countries, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]); //if you are not on page one and try to search, it need to go back to page 1 or it won't work bc you might be on the wrong page to see the results

  if (isLoading || !countries) return <p>Loading...</p>;
  if (error) return <p>Error loading countries.</p>;

  const handleSearchInput = (name: string) => {
    setQuery(name);
  };

  return (
    <div>
      <FilterBar query={query} setQuery={handleSearchInput} />
      <CountriesTable
        filteredCountries={filteredCountries}
        currentPage={currentPage}
        amtCountriesPerPage={amtCountriesPerPage}
      />
      <Pagination
        amtCountriesPerPage={amtCountriesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredCountries={filteredCountries}
      />
    </div>
  );
};

export default Home;
