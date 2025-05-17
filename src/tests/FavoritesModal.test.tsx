import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesModal from "../components/FavoritesModal";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Favorite } from "../types/Favorites";

// ✅ Custom context provider for test with state
const CustomFavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = React.useState<Favorite[]>([
    {
      cca3: "USA",
      name: { common: "United States" },
    },
  ]);

  const addFavorite = (favorite: Favorite) => {
    setFavorites((current) =>
      current.some((item) => item.cca3 === favorite.cca3)
        ? current
        : [...current, favorite]
    );
  };

  const removeFavorite = (code: string) => {
    setFavorites((current) => current.filter((item) => item.cca3 !== code));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}; //makes a favorites provider we can use for testing

describe("FavoritesModal", () => {
  test("renders with a favorite", () => {
    render(
      <CustomFavoritesProvider>
        <FavoritesModal onClose={jest.fn()} />
      </CustomFavoritesProvider>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Your Exploring Wishlist")).toBeInTheDocument();
    expect(screen.getByText("United States")).toBeInTheDocument(); //item we mocked in the favorites
  });

  test("removes a favorite when remove button is clicked", () => {
    render(
      <CustomFavoritesProvider>
        <FavoritesModal onClose={jest.fn()} />
      </CustomFavoritesProvider>
    );
    // click the remove button
    fireEvent.click(
      screen.getByRole("button", { name: /remove united states/i })
    );

    // expect to see the "No favorites yet" message
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    render(
      <CustomFavoritesProvider>
        <FavoritesModal onClose={onClose} />
      </CustomFavoritesProvider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /close favorites modal/i })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
