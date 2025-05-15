import React from "react";
import { Country } from "../types/Country";

type PaginationProps = {
  currentPage: number;
  //this is the current page the the user is looking at on the home screen
  setCurrentPage: (currentPage: number) => void;
  //this is so the user can change the currentpage state when the button is clicked
  amtCountriesPerPage: number;
  //this is a value that tells how many items in the list the user can see per page
  filteredCountries: Country[];
  //this shows the countries list that has been filtered by the search bar and also ordered alphabetically
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  amtCountriesPerPage,
  filteredCountries,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {/* math to tell how many total pages there are */}
        Page {currentPage} of{" "} {/* prettier keeps doing it like this */}
        {Math.ceil(filteredCountries.length / amtCountriesPerPage)}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={
          currentPage ===
          Math.ceil(filteredCountries.length / amtCountriesPerPage)
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
