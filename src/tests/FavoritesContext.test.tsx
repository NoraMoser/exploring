import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "../contexts/FavoritesContext";
import type { Favorite } from "../types/Favorites";

// Mock favorite item
const mockCountry: Favorite = {
  name: { common: "Testland" },
  cca3: "TST",
};

// Test component using the context
const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  return (
    <div>
      <button onClick={() => addFavorite(mockCountry)}>Add</button>
      <button onClick={() => removeFavorite("TST")}>Remove</button>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.cca3}>{fav.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

describe("FavoritesContext", () => {
  test("starts with empty favorites", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("adds a favorite", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Testland")).toBeInTheDocument();
  });

  test("removes a favorite", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Remove"));

    expect(screen.queryByText("Testland")).not.toBeInTheDocument();
  });

  test("removing non-existent favorite does nothing", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText("Remove")); // remove before adding
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("does not add duplicates", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Add"));

    expect(screen.getAllByText("Testland").length).toBe(1);
  });

  const BrokenComponent = () => {
    useFavorites();
    return null;
  };

  test("throws error if used outside FavoritesProvider", () => {
    // Wrap in a function to catch the error
    const renderBroken = () => render(<BrokenComponent />);
    expect(renderBroken).toThrow(
      "useFavorites must be used with Favorites Provider. :)"
    );
  });
});
