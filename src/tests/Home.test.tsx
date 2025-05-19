import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockCountries } from "../mocks/mockCountries";
import { fetchAllCountries } from "../services/countriesAPI";
import FilterBar from "../components/FilterBar";
import Home from "../pages/Home";
import CountriesTable from "../components/CountriesTable";
import CountryRow from "../components/CountryRow";
import Pagination from "../components/Pagination";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Favorite } from "../types/Favorites";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate, //have to mock this usenavigate since some components use it
  };
});

jest.mock("../services/countriesAPI", () => ({
  fetchAllCountries: jest.fn(), //this is the function in the service that gives su our array of data
}));

beforeEach(() => {
  (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
const queryClient = createTestQueryClient(); //gotta do a fake browser router for the tests bc we wrap all components in router

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </BrowserRouter>
  );

describe("Home Page", () => {
  test("renders loading state initially", () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders list of countries after fetch", async () => {
    renderWithRouter(<Home />);
    await waitFor(() => {
      const cells = screen.getAllByText("Canada");
      expect(cells.length).toBeGreaterThan(0);
    });
  });

  test("renders FilterBar component inside Home", () => {
    renderWithRouter(<Home />);
    const filterBarHeading = screen.getByRole("heading", {
      name: /exploring/i,
    });
    expect(filterBarHeading).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    (fetchAllCountries as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );
    renderWithRouter(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe("FilterBar Component", () => {
  test("renders heading from FilterBar with fake props", () => {
    const fakeProps = { query: "Nora", setQuery: () => {} };
    render(<FilterBar {...fakeProps} />);
    const heading = screen.getByRole("heading", { name: /exploring/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders input with placeholder 'search countries...' in FilterBar", () => {
    const fakeProps = { query: "Nora", setQuery: () => {} };
    render(<FilterBar {...fakeProps} />);
    const input = screen.getByPlaceholderText(/search countries.../i);
    expect(input).toBeInTheDocument();
  });

  test("calls setQuery when input changes", () => {
    const setQuery = jest.fn();
    render(<FilterBar query="" setQuery={setQuery} />);
    const input = screen.getByPlaceholderText(/search countries.../i);
    fireEvent.change(input, { target: { value: "Nora" } });
    expect(setQuery).toHaveBeenCalledWith("Nora");
  });

  test("opens and closes the FavoritesModal when View Favorites is clicked", () => {
    const setQuery = jest.fn();
    const favoritesMock: Favorite[] = [
      { cca3: "USA", name: { common: "United States" } },
    ];
    const addFavorite = jest.fn();
    const removeFavorite = jest.fn();

    render(
      <FavoritesContext.Provider
        value={{ favorites: favoritesMock, addFavorite, removeFavorite }}
      >
        <FilterBar query="" setQuery={setQuery} />
      </FavoritesContext.Provider>
    );

    const openButton = screen.getByRole("button", { name: /view favorites/i });
    fireEvent.click(openButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/your exploring wishlist/i)).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: /close favorites modal/i,
    });
    fireEvent.click(closeButton);

    waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

describe("CountriesTable Component", () => {
  test("renders a table with headings", () => {
    const fakeProps = {
      filteredCountries: mockCountries,
      currentPage: 1,
      amtCountriesPerPage: 10,
    };
    render(
      <MemoryRouter>
        <CountriesTable {...fakeProps} />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("columnheader", { name: /common name/i })
    ).toBeInTheDocument();
  });

  test("shows the correct country name after slicing", () => {
    const fakeProps = {
      filteredCountries: mockCountries,
      currentPage: 1,
      amtCountriesPerPage: 1,
    };
    render(
      <MemoryRouter>
        <CountriesTable {...fakeProps} />
      </MemoryRouter>
    );
    const cells = screen.getAllByText("Canada");
    expect(cells.length).toBeGreaterThan(0);
    expect(screen.queryByText("France")).not.toBeInTheDocument();
  });

  test("shows no countries message when list is empty", () => {
    const fakeProps = {
      filteredCountries: [],
      currentPage: 1,
      amtCountriesPerPage: 10,
    };
    render(
      <MemoryRouter>
        <CountriesTable {...fakeProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/sorry, no countries found/i)).toBeInTheDocument();
  });

  test("if list is not empty, do not show no countries message", () => {
    const fakeProps = {
      filteredCountries: mockCountries,
      currentPage: 1,
      amtCountriesPerPage: 10,
    };
    render(
      <MemoryRouter>
        <CountriesTable {...fakeProps} />
      </MemoryRouter>
    );
    expect(
      screen.queryByText(/sorry, no countries found/i)
    ).not.toBeInTheDocument();
  });

  test("navigates to country detail on row click", () => {
    const fakeProps = {
      filteredCountries: mockCountries,
      currentPage: 1,
      amtCountriesPerPage: 10,
    };
    render(
      <MemoryRouter>
        <CountriesTable {...fakeProps} />
      </MemoryRouter>
    );
    const row = screen.getByTestId("row-CAN");
    fireEvent.click(row);
    expect(mockedNavigate).toHaveBeenCalledWith("/country/CAN");
  });
});

describe("CountryRow Component", () => {
  test("calls onSelectCountry when row is clicked", () => {
    const mockSelectCountry = jest.fn();
    const fakeProps = {
      country: mockCountries[0],
      onSelectCountry: mockSelectCountry,
    };
    render(
      <MemoryRouter>
        <CountryRow {...fakeProps} />
      </MemoryRouter>
    );
    const row = screen.getByTestId("row-CAN");
    fireEvent.click(row);
    expect(mockSelectCountry).toHaveBeenCalledWith("CAN");
  });

  test("calls onSelectCountry when Enter key is pressed", () => {
    const mockSelect = jest.fn();
    const fakeProps = {
      country: mockCountries[0],
      onSelectCountry: mockSelect,
    };
    render(
      <MemoryRouter>
        <CountryRow {...fakeProps} />
      </MemoryRouter>
    );
    const row = screen.getByTestId("row-CAN");
    row.focus();
    fireEvent.keyDown(row, { key: "Enter", code: "Enter", charCode: 13 });
    expect(mockSelect).toHaveBeenCalledWith("CAN");
  });

  test("does not call onSelectCountry when non-Enter key is pressed", () => {
    const mockSelect = jest.fn();
    const fakeProps = {
      country: mockCountries[0],
      onSelectCountry: mockSelect,
    };
    render(
      <MemoryRouter>
        <CountryRow {...fakeProps} />
      </MemoryRouter>
    );
    const row = screen.getByTestId("row-CAN");
    row.focus();
    fireEvent.keyDown(row, { key: "Space", code: "Space" });
    expect(mockSelect).not.toHaveBeenCalled();
  });

  test("renders the common and official names", () => {
    const mockSelect = jest.fn();
    const fakeProps = {
      country: mockCountries[0],
      onSelectCountry: mockSelect,
    };
    render(
      <MemoryRouter>
        <CountryRow {...fakeProps} />
      </MemoryRouter>
    );
    const common = screen.getAllByText("Canada");
    expect(common.length).toBeGreaterThan(0);
  });

});
describe("Pagination", () => {
  test("renders current and total page count", () => {
    render(
      <Pagination
        currentPage={2}
        setCurrentPage={jest.fn()}
        amtCountriesPerPage={10}
        filteredCountries={mockCountries}
      />
    );
    expect(
      screen.getByText((content, element) =>
        element?.textContent === "Page 2 of 1"
      )
    ).toBeInTheDocument();
    
  });

  test("disables Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={jest.fn()}
        amtCountriesPerPage={10}
        filteredCountries={mockCountries}
      />
    );
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  test("disables Next button on last page", () => {
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={jest.fn()}
        amtCountriesPerPage={10}
        filteredCountries={mockCountries}
      />
    );
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  test("calls setCurrentPage with next page on Next click", () => {
    const setCurrentPageMock = jest.fn();
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={setCurrentPageMock}
        amtCountriesPerPage={1} //only 2 mock countries
        filteredCountries={mockCountries}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  test("calls setCurrentPage with previous page on Previous click", () => {
    const setCurrentPageMock = jest.fn();
    render(
      <Pagination
        currentPage={2}
        setCurrentPage={setCurrentPageMock}
        amtCountriesPerPage={1}
        filteredCountries={mockCountries}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });

});
