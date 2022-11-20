import FavoriteCard from "./Components/FavoriteCard";
import Favourite from "../../../Models/Favourite.model";
import FavoritesService from "../../../Services/Favorites.service";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

export const Favourites = () => {
  const [loading, setLoading] = useState(true);
  const [arrayFavouritesCars, setArrayFavouritesCars] = useState<Favourite[]>(
    []
  );
  const toastFavorite = useRef<Toast>(null);

  const fetchFavoutiresCars = async () => {
    setLoading(true);
    await FavoritesService.get().then((res: any) => {
      setArrayFavouritesCars(res.data.content);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchFavoutiresCars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Toast ref={toastFavorite} position="bottom-right" />
      {loading ? (
        <h1>Loading ...</h1>
      ) : !arrayFavouritesCars ? (
        <h1>No Favorites added</h1>
      ) : (
        arrayFavouritesCars.map((element) => (
          <FavoriteCard
            key={element.id}
            favs={element}
          />
        ))
      )}
    </div>
  );
};

export default Favourites;
