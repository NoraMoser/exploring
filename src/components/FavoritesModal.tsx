import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";

type FavoritesModalProps = {
  onClose: () => void;
  //this function tells the modal whether to open or close
};

const FavoritesModal: React.FC<FavoritesModalProps> = ({ onClose }) => {
  //modal to show the favorites information
  const { favorites, removeFavorite } = useFavorites();
  //getting this from the context favorites is the array with name and cc3 for the countries that the user favorited and remove is the funt filtering out the removed one

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-title"
    >
      <div className="modal">
        <h2 id="favorites-title">Your Exploring Wishlist</h2>

        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <ul>
            {favorites.map((country) => (
              <li key={country.cca3}>
                {`${country.name.common}     `} 
                <button
                  onClick={() => removeFavorite(country.cca3)}
                  aria-label={`Remove ${country.name.common} from favorites`}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}

        <button className="modal-close" onClick={onClose} aria-label="Close favorites modal">
          x
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
