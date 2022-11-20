import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Favourite from "../Models/Favourite.model";
import User from "../Models/User.model";
import FavoritesService from "../Services/Favorites.service";

interface FavoriteButtonProps {
  carId: number;
}

export const FavouriteButton = (props: FavoriteButtonProps) => {
  const [client] = useState<User>(
    JSON.parse(localStorage.getItem("CLIENT") || "")
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [favouriteId, setFavouriteId] = useState(-1);
  const toast = useRef<Toast>(null);

  const showToastAddFavourite = () => {
    toast.current?.show({
      severity: "success",
      summary: "Auto agregado a favoritos",
      life: 3000,
    });
  };

  const showToastDeleteFavourite = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Auto eliminado de favoritos",
      life: 3000,
    });
  };

  const validateIfIsFavorite = () => {
    const favourites: Favourite[] = client?.favourites || [];
    const isFavorite = favourites.find((fav) => fav.car.id === props.carId);
    setIsFavorite(isFavorite ? true : false);
    setFavouriteId(isFavorite ? isFavorite.id : -1);
  };

  useEffect(() => {
    validateIfIsFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = async () => {
    if (isFavorite) {
      await FavoritesService.delete(favouriteId)
        .then(() => {
          const favourites: Favourite[] = client?.favourites || [];
          const newFavourites = favourites.filter(
            (fav) => fav.car.id !== props.carId
          );
          client.favourites = newFavourites;
          localStorage.setItem("CLIENT", JSON.stringify(client));
          setIsFavorite(false);
          showToastDeleteFavourite();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await FavoritesService.post(props.carId)
        .then((response) => {
          const favourites: Favourite[] = client?.favourites || [];
          favourites.push(response.data);
          client.favourites = favourites;
          localStorage.setItem("CLIENT", JSON.stringify(client));
          setIsFavorite(true);
          showToastAddFavourite();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Button
        icon="pi pi-heart "
        className={
          "!absolute !right-0 text-center p-button-rounded p-button-text !w-[50px] hover:!bg-cyan-100 " +
          (isFavorite
            ? "!bg-red-200/75 !text-red-500"
            : "!bg-[#CEE4FF] !text-black")
        }
        onClick={onClick}
      />
    </>
  );
};

export default FavouriteButton;
