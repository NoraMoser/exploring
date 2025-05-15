import React from "react";

type FilterProps = {
  setQuery: (query: string) => void;
  //this sets the value from the input/search bar on the home screen nav bar
  query: string;
  //the value string from the search bar.  it was needed to filter the countries list so has been lifted to the parent component.
};

const FilterBar: React.FC<FilterProps> = ({ setQuery, query }) => {
  return (
    <nav className="home-nav-bar">
      <h1>Exploring 🌎</h1>
      <input
        className="search"
        type="text"
        placeholder="Search countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </nav>
  );
};

export default FilterBar;
