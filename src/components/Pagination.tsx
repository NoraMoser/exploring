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
  //this section has previous and next buttons and the user can see what page they are on
  currentPage,
  setCurrentPage,
  amtCountriesPerPage,
  filteredCountries,
}) => {
  const totalPages = Math.ceil(filteredCountries.length / amtCountriesPerPage);
  //makes it easy to tell where i am gett\ing the total pages from
  const handlePrevious = () => setCurrentPage(currentPage - 1);
  const handleNext = () => setCurrentPage(currentPage + 1);
  //set current page on click
  return (
    <nav
      className="pagination"
      role="navigation"
      aria-label="Country pagination"
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <span aria-live="polite">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
