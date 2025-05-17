import React from "react";
import { fetchCountryByCode } from "../services/countriesAPI";
import { mockCountries } from "../mocks/mockCountries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import CountryDetail from "../pages/CountryDetail";
import CountryDetailHeader from "../components/CountryDetailHeader";
import CountryDetailInfos from "../components/CountryDetailInfo";
import * as ReactRouterDom from "react-router-dom";
import { FavoritesProvider } from "../contexts/FavoritesContext";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  };
});
// mock react-leaflet before importing components that use it
jest.mock("react-leaflet", () => ({
  //had to mock leaflet bc cra does not update react testing library for typescript and it has been a pain i guess jest does not understand es modules
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />,
}));

const mockCountry = mockCountries[0];

jest.mock("../services/countriesAPI", () => ({
  //mock the countries api
  fetchCountryByCode: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks(); //it was holding onto a cached value so i had to clear them before each test
  (ReactRouterDom.useParams as jest.Mock).mockReturnValue({ code: "CAN" }); //country detail expects the code param and tests will not work without it
  (fetchCountryByCode as jest.Mock).mockResolvedValue({ //here we just get the one country- really just cc3 and common name
    cca3: "CAN",
    name: { common: "Canada" },
  });
});

const renderWithProviders = (ui: React.ReactElement) => {
  //had this separated but i needed it to re do the cache before each next test. 4 hours later, voila :).
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <ReactRouterDom.BrowserRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ReactRouterDom.BrowserRouter>
  );
};

// CountryDetail tests********
describe("CountryDetail", () => {
  test("shows loading text initially", async () => {
    (ReactRouterDom.useParams as jest.Mock).mockReturnValue({ code: "CAN" });
    (fetchCountryByCode as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    renderWithProviders(<CountryDetail />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("does not show loading when data loads", async () => {
    (ReactRouterDom.useParams as jest.Mock).mockReturnValue({ code: "CAN" });
    (fetchCountryByCode as jest.Mock).mockResolvedValue({
      cca3: "CAN",
      name: { common: "Canada" },
    });

    renderWithProviders(<CountryDetail />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    // Optionally verify that some country detail is rendered
    expect(screen.getByText(/canada/i)).toBeInTheDocument();
  });
});

// CountryDetailHeader tests********
describe("CountryDetailHeader", () => {
  test("renders the country name", () => {
    render(
      <ReactRouterDom.MemoryRouter>
        <CountryDetailHeader country={mockCountry} />
      </ReactRouterDom.MemoryRouter>
    );
    expect(screen.getByText(/canada/i)).toBeInTheDocument();
  });

  test("renders the country flag image with correct alt text", () => {
    render(
      <ReactRouterDom.MemoryRouter>
        <CountryDetailHeader country={mockCountry} />
      </ReactRouterDom.MemoryRouter>
    );
    const flag = screen.getByAltText(
      /The flag of Canada features a red maple leaf in the center with red borders on either side./i
    );
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute("src", mockCountry.flags.svg);
  });

  test("renders a back button", () => {
    render(
      <ReactRouterDom.MemoryRouter>
        <CountryDetailHeader country={mockCountry} />
      </ReactRouterDom.MemoryRouter>
    );
    expect(
      screen.getByRole("button", { name: /back/i })
    ).toBeInTheDocument();
  });

  test("clicking back button navigates to home", () => {
    const mockNavigate = jest.fn();
    (ReactRouterDom.useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <ReactRouterDom.MemoryRouter>
        <CountryDetailHeader country={mockCountry} />
      </ReactRouterDom.MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

// CountryDetailInfos component********
describe("CountryDetailInfos", () => {
  test("renders the capital correctly", () => {
    
    render(
      <FavoritesProvider>
        <CountryDetailInfos country={mockCountry} />
      </FavoritesProvider>
    );

    // Find the strong element with "Capital:" text
    const label = screen.getByText("Capital:");

    // Its parent <h3> contains the full text
    const parent = label.closest("h3");
    expect(parent).toHaveTextContent("Capital: Ottawa");
  });
});
