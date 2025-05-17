// ErrorBoundary.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary";
import CountryDetailInfos from "../components/CountryDetailInfo";
import { mockCountries } from "../mocks/mockCountries";

const mockCountry = mockCountries[0]; //importing this so i can use it in the country details info component

// Test component that throws
const ProblemChild = () => {
  throw new Error("Boom!");
};

describe("ErrorBoundary", () => {
  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>All good!</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("All good!")).toBeInTheDocument();
  });

  test("catches error and displays fallback UI", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /something unexpected happened/i })).toBeInTheDocument();
    expect(screen.getByText(/boom/i)).toBeInTheDocument();

    spy.mockRestore();
  });

  test("resets error when key changes", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    // first render with ProblemChild to cause error
    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
  
    expect(screen.getByRole("alert")).toBeInTheDocument();
    // rerender with new key and normal children
    rerender(
      <ErrorBoundary key="reset">
        <p>Recovered!</p>
      </ErrorBoundary>
    );
  
    expect(screen.getByText("Recovered!")).toBeInTheDocument(); //checking if error goes away after rerender
  
    spy.mockRestore();
  });

  test("catches context error from component missing provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  
    render(
      <ErrorBoundary>
        <CountryDetailInfos country={mockCountry} />
      </ErrorBoundary>
    );
  
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /something unexpected happened/i })).toBeInTheDocument();
    expect(screen.getByText(/useFavorites must be used with Favorites Provider/i)).toBeInTheDocument(); //check that the user gets the warning if they us favorites context outside provider
  
    spy.mockRestore();
  });
});
