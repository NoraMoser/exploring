import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockCountries } from "../mocks/mockCountries";
import { fetchAllCountries } from "../services/countriesAPI";
import FilterBar from "../components/FilterBar";
import Home from "../pages/Home";
import CountriesTable from "../components/CountriesTable";
import CountryRow from "../components/CountryRow";
import Pagination from "../components/Pagination";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
      ...actual,
      useNavigate: () => mockedNavigate,
    };
  });
  

jest.mock("../services/countriesAPI", () => ({ //mock the countries api
  fetchAllCountries: jest.fn(),
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
const queryClient = createTestQueryClient();

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </BrowserRouter>
  );

//Home Page**********
test("renders loading state initially", () => {
  //before getting the api, makes sure the loading page is showing
  renderWithRouter(<Home />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("renders list of countries after fetch", async () => {
  //wait for the api to load an then check for a name
  renderWithRouter(<Home />);
  // Wait for some country name from mockCountries to appear
  await waitFor(() => {
    const cells = screen.getAllByText("Canada"); //each common name is in both title and the written text
    expect(cells.length).toBeGreaterThan(0);
  });
});

test("renders FilterBar component inside Home", () => {
  renderWithRouter(<Home />);
  // For example, the FilterBar's heading "exploring"
  const filterBarHeading = screen.getByRole("heading", { name: /exploring/i });
  expect(filterBarHeading).toBeInTheDocument();
});

//Filter Bar Component******
test("renders heading from FilterBar with fake props", () => {
  //want to make sure the main title is there
  const fakeProps = {
    query: "Nora",
    setQuery: () => {},
  };
  render(<FilterBar {...fakeProps} />);
  const heading = screen.getByRole("heading", { name: /exploring/i });
  expect(heading).toBeInTheDocument();
});

test("renders input with placeholder 'search countries...' in FilterBar", () => {
  const fakeProps = {
    query: "Nora",
    setQuery: () => {},
  };
  render(<FilterBar {...fakeProps} />);
  const input = screen.getByPlaceholderText(/search countries.../i);
  expect(input).toBeInTheDocument();
});

test("calls setQuery when input changes", () => {
  //tests that the function is called when the user types in the input bar
  const setQuery = jest.fn();
  render(<FilterBar query="" setQuery={setQuery} />);

  const input = screen.getByPlaceholderText(/search countries.../i);
  fireEvent.change(input, { target: { value: "Nora" } });

  expect(setQuery).toHaveBeenCalledWith("Nora");
});

//CountriesTable Component**********

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
  ); //you have to wrap in memory router due to useNavigate on this component
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
  ); //you have to wrap in memory router due to useNavigate on this component
  const cells = screen.getAllByText("Canada"); //each common name is in both title and the written text
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

test("if list is not empty, do not show no countries message when list is empty", () => {
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
  expect(screen.queryByText(/sorry, no countries found/i)).not.toBeInTheDocument();
});

test("navigates to country detail on row click", () => { //mocked useNavigate above so just making sure it is working
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


//CountryRow Component*********

test("if select country is called when a row item is clicked", () => {
    const mockSelectCountry = jest.fn()
    const fakeProps = {
      country: mockCountries[0],
      onSelectCountry: mockSelectCountry
    };
    render(
      <MemoryRouter>
        <CountryRow {...fakeProps}/>
      </MemoryRouter>
    );
    const row = screen.getByTestId("row-CAN");
    fireEvent.click(row);
    expect(mockSelectCountry).toHaveBeenCalledWith("CAN");
  });

  test("calls onSelectCountry when Enter key is pressed", () => { //making sure keyboard command works and not just click
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
    const common = screen.getAllByText("Canada"); //each common name is in both title and the written text
    expect(common.length).toBeGreaterThan(0);
    const official = screen.getAllByText("Canadadada"); //each official name is in both title and the written text
    expect(official.length).toBeGreaterThan(0);
  });
  
  test("row is keyboard accessible", () => {
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
    expect(row).toHaveAttribute("tabIndex", "0");
  });
  
  test("matches snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <CountryRow
          country={mockCountries[0]}
          onSelectCountry={() => {}}
        />
      </MemoryRouter>
    );
  
    expect(container).toMatchSnapshot();
  });

  
  //Pagination Component******
  test("renders correct number of page buttons", () => {
    render(
      <Pagination
      currentPage={1}
      setCurrentPage= {() => {}}
      amtCountriesPerPage={10}
      filteredCountries={mockCountries}
      />
    );
  
    const currPage = screen.getAllByText("1");
    expect(currPage.length).toBeGreaterThan(0);
    const totalPages = screen.getAllByText("1");
    expect(totalPages.length).toBeGreaterThan(0); //for different amounts, put more in the mock
  });

  test("calls setCurrent Page on Next button click", () => {
    const mockPageChange = jest.fn();
    render(
      <Pagination
      currentPage={1}
      setCurrentPage= {mockPageChange}
      amtCountriesPerPage={1}
      filteredCountries={mockCountries}
      />
    );

    fireEvent.click(screen.getByText(/next/i));
  expect(mockPageChange).toHaveBeenCalledWith(2);
});

test("calls setCurrent Page on Prev button click", () => {
    const mockPageChange = jest.fn();
    render(
      <Pagination
      currentPage={2}
      setCurrentPage= {mockPageChange}
      amtCountriesPerPage={1}
      filteredCountries={mockCountries}
      />
    );

    fireEvent.click(screen.getByText(/previous/i));
  expect(mockPageChange).toHaveBeenCalledWith(1);
});

test("Prev Button is disabled", () => {
    const mockPageChange = jest.fn();
    render(
      <Pagination
      currentPage={1}
      setCurrentPage= {mockPageChange}
      amtCountriesPerPage={1}
      filteredCountries={mockCountries}
      />
    );

    expect(screen.getByText(/previous/i)).toBeDisabled();

});

test("Next Button is disabled", () => {
    const mockPageChange = jest.fn();
    render(
      <Pagination
      currentPage={2}
      setCurrentPage= {mockPageChange}
      amtCountriesPerPage={1}
      filteredCountries={mockCountries}
      />
    );

    expect(screen.getByText(/next/i)).toBeDisabled();

});