import React from 'react'


type FilterProps = {
  setQuery: (query: string) => void;
  query: string
};

const FilterBar: React.FC<FilterProps> = ({setQuery, query}) => {

    return (
        <nav>
            <input
              className="search"
              type="text"
              placeholder="Search countries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
        </nav>
    );
}

export default FilterBar