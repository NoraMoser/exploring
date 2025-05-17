// ErrorBoundary.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary";

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
  
    // First render with ProblemChild to cause error
    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
  
    expect(screen.getByRole("alert")).toBeInTheDocument();
  
    // Re-render with new key and normal children
    rerender(
      <ErrorBoundary key="reset">
        <p>Recovered!</p>
      </ErrorBoundary>
    );
  
    expect(screen.getByText("Recovered!")).toBeInTheDocument();
  
    spy.mockRestore();
  });
  
});
