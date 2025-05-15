import React from "react";

type FilterProps = {
  setQuery: (query: string) => void;
  //this sets the value from the input/search bar on the home screen nav bar
  query: string;
  //the value string from the search bar.  it was needed to filter the countries list so has been lifted to the parent
};

const FilterBar: React.FC<FilterProps> = ({ setQuery, query }) => {
  return (
    <nav className="home-nav-bar">
      <div className="title-items">
      <h1 className="title">Exploring</h1> {/* i had this as a large size, but a lighthouse audit said it was affecting performance, so i made it smaller. */}
      <div>🌎</div>
      </div>
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
