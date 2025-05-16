import React from "react";
import { useParams } from "react-router-dom";
import { fetchCountryByCode } from "../services/countriesAPI";

//components
import CountryMaps from "../components/CountryMaps";
import CountryDetailHeader from "../components/CountryDetailHeader";
import CountryDetailInfos from "../components/CountryDetailInfo";

import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "../components/ErrorBoundary";
//https://tanstack.com/query/latest/docs/framework/react/overview for fetching data from the api

const CountryDetail = () => {
  //this is the detail page for each country
  const { code } = useParams<{ code: string }>();
  //get code out of the url
  const {
    data: country, //this is a single country object
    isLoading,
    error, //loading and error states for data retrieval
  } = useQuery({
    queryKey: ["country", code], //the key that react query requires
    queryFn: () => fetchCountryByCode(code!), //the ! is a non null assertion operator (only do this if you know there is a value)
    enabled: !!code, //this makes react query only run if you have data in code so no errors
  });

  if (isLoading || !country) return <p aria-live="polite">Loading...</p>; //had to do this bc country isn't immediately available to pass as a prop
  if (error) return <p role="alert">Error loading countries.</p>; //fallback ui for if there is an error

  return (
    <main>
      {/* sectioning these out for the sake of screen readers */}
      <section aria-labelledby="country-header">
        <h1 id="country-header" className="visually-hidden">
          Country Details Header
        </h1>
        <ErrorBoundary>
          <CountryDetailHeader country={country} />
        </ErrorBoundary>
      </section>

      <section aria-labelledby="country-map">
        <h2 id="country-map" className="visually-hidden">
          Country location map
        </h2>
        <ErrorBoundary>
          <CountryMaps country={country} />
        </ErrorBoundary>
      </section>

      <section aria-labelledby="country-info">
        <h2 id="country-info" className="visually-hidden">
          Country details
        </h2>
        <ErrorBoundary>
          <CountryDetailInfos country={country} />
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default CountryDetail;
