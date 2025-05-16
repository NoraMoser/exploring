import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../services/countriesAPI";

//components
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
const CountriesTable = lazy(() => import("../components/CountriesTable"));

const Home = () => {
  //main page that shows the table the all the countries listed on it
  const {
    data: countries, //this is the entire list of countries in an array
    isLoading,
    error, //these two handle loading and error states
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    //using react query here to fetch the data from the function in countriesapi
  });
  const [query, setQuery] = useState(""); //this is the value from the search input
  const [currentPage, setCurrentPage] = useState(1); //current page the user is on

  const amtCountriesPerPage = 12;
  const filteredCountries = useMemo(() => {
    //this caches filtered countries so it will run only with a change of one of the vars in the dependency array
    if (!countries) return [];

    const sortedCountries = countries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    ); //this puts names of countries in alphabetical order

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
    //callback that changes squery state when the user searcches in the search bar
    setQuery(name);
  };

  return (
    <main className="home-div">
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="visually-hidden">
          Filter countries
        </h2>
        <FilterBar query={query} setQuery={handleSearchInput} />
      </section>
      {/* for the benefit on screen readers */}
      <section aria-labelledby="countries-heading" className="main-content">
        <Suspense fallback={<p aria-live="polite">Loading countries...</p>}>
          {/* help with speed by lazy loading and gives a fallback ui while loading*/}
          <CountriesTable
            filteredCountries={filteredCountries}
            currentPage={currentPage}
            amtCountriesPerPage={amtCountriesPerPage}
          />
        </Suspense>
      </section>
      <nav aria-label="Pagination navigation">
        <Pagination
          amtCountriesPerPage={amtCountriesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredCountries={filteredCountries}
        />
      </nav>
    </main>
  );
};

export default Home;
