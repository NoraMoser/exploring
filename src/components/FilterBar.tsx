import React from "react";

type FilterProps = {
  setQuery: (query: string) => void;
  //this sets the value from the input/search bar on the home screen nav bar
  query: string;
  //the value string from the search bar.  it was needed to filter the countries list so has been lifted to the parent
};

const FilterBar: React.FC<FilterProps> = ({ setQuery, query }) => {
  //the nav bar on the home page with a search in it so the user can search for countries and the title of the app
  return (
    <header className="home-nav-bar" role="banner">
      <h1 className="title">Exploring</h1>
      {/* smaller for performance based on Lighthouse audit */}

      <label htmlFor="country-search" className="visually-hidden">
        Search for a country
      </label>
      <input
        id="country-search"
        className="search"
        type="text"
        placeholder="Search countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search countries"
      />
    </header>
  );
};

export default FilterBar;
