import React, { createContext, useContext, useState } from "react";
import { Favorite } from "../types/Favorites";

type FavoritesContextType = {
    favorites: Favorite[];
    //some items that will be saved with the favorites - an array of objs
    addFavorite: (favorite: Favorite) => void;
    //function to add a new item to the favorites array
    removeFavorite: (code: string) => void;
    //function to remove an item based on the code from the favorites array
  };
  
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined); //need this for testing (the export)

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    //using context so we can share the favorites state among different screens
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    
    const addFavorite = (favorite: Favorite) => {
        setFavorites((currFav) =>
        currFav.some((item) => item.cca3 === favorite.cca3) ? currFav : [...currFav, favorite]);
        //if it's a new item then put it in the favorites state but if it's already there then don't
        //.some is like .includes but for objects and bigger things
    };

    const removeFavorite = (code: string) => {
        setFavorites((currFav) => currFav.filter((item) => item.cca3 !== code));
        //return an array without the code that the user does not want
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite}}>
            {children}
        </FavoritesContext.Provider>
        //this makes the items in the value availsable everywhere
    )

}
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("useFavorites must be used with Favorites Provider. :)")
        return context
}