import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesModal from "../components/FavoritesModal";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Favorite } from "../types/Favorites";

// ✅ Custom context provider for test with state
const CustomFavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = React.useState<Favorite[]>([
    {
      cca3: "USA",
      name: { common: "United States" },
    },
  ]);

  const addFavorite = (favorite: Favorite) => {
    setFavorites((curr) =>
      curr.some((f) => f.cca3 === favorite.cca3) ? curr : [...curr, favorite]
    );
  };

  const removeFavorite = (code: string) => {
    setFavorites((curr) => curr.filter((f) => f.cca3 !== code));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

describe("FavoritesModal", () => {
  it("renders with a favorite", () => {
    render(
      <CustomFavoritesProvider>
        <FavoritesModal onClose={jest.fn()} />
      </CustomFavoritesProvider>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Your Exploring Wishlist")).toBeInTheDocument();
    expect(screen.getByText("United States")).toBeInTheDocument();
  });

  it("removes a favorite when remove button is clicked", () => {
    render(
      <CustomFavoritesProvider>
        <FavoritesModal onClose={jest.fn()} />
      </CustomFavoritesProvider>
    );

    // Click the remove button
    fireEvent.click(screen.getByRole("button", { name: /remove united states/i }));

    // Expect to see the "No favorites yet" message
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    render(
      <CustomFavoritesProvider>
        <FavoritesModal onClose={onClose} />
      </CustomFavoritesProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /close favorites modal/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
