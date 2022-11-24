import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import FavouriteButton from "../../../../Components/FavouriteButton";
import Favourite from "../../../../Models/Favourite.model";
import { useNavigate } from "react-router-dom";

type Props = {
  favs: Favourite;
};

function FavoriteCard(props: Props) {
  const navigate = useNavigate();

  const imageCarouselTemplate = (product: String) => {
    return (
      <div className="">
        <img
          src={`${product}`}
          alt={`${product}`}
        />
      </div>
    );
  };

  return (
    <div className="bg-card-content flex max-w-[400px] md:max-w-[600px] md:h-[300px] rounded-[15px] shadow-sm mx-auto mt-[35px]">
      <div className=" md:w-[476px] md:flex border-r-2 border-gray-300 md:border-r-0">
        <div className="max-w-[280px] md:w-[220px] bg-primary rounded-l-lg flex relative">
        <Carousel
          value={props.favs.car.imagePath}
          numVisible={1}
          numScroll={1}
          orientation="vertical"
          verticalViewPortHeight="150px"
          itemTemplate={imageCarouselTemplate}
        />
          <FavouriteButton carId={props.favs.car.id} />
        </div>
        <div className="md:w-[256px] md:border-r-2 border-gray-300 px-[12px] py-[15px]">
          <p className="text-[20px] font-bold">
            {props.favs.car.carModel.name}
          </p>
          <div className="flex items-center py-1">
            <div className="flex items-center">
              <i className="pi pi-user" style={{ fontSize: "17px" }}></i>
              <p className="ml-2 font-bold text-[14px]">
                {props.favs.car.seating}
              </p>
            </div>
            <div className="flex items-center ml-4">
              <i className="pi pi-sitemap" style={{ fontSize: "17px" }}></i>
              <p className="ml-2 font-bold text-[14px]">
                {props.favs.car.manual ? "M" : "A"}
              </p>
            </div>
          </div>
          <div className="flex py-2 items-center border-y-2 border-gray-300">
            <i className="pi pi-map" style={{ fontSize: "17px" }}></i>
            <p className="ml-2 text-[12px]">{props.favs.car.address}</p>
          </div>
          <ul className="pt-2 list-disc pl-6">
            <li>{props.favs.car.extraInformation}</li>
          </ul>
        </div>
      </div>
      <div className="md:max-w-[124px] px-1 py-4 grid content-end">
        <p className="text-xl font-bold my-auto ml-0 my-0 mt-auto">
          S/ {props.favs.car.rentAmountDay}
        </p>
        <p className="ml-0 my-2">Por día</p>
        <p className="text-xl font-bold my-auto ml-0 my-0 mt-auto">
          S/ {props.favs.car.rentAmountKilometer}
        </p>
        <p className="ml-0 my-2">Por kilometro</p>
        <Button
          label="Ver oferta"
          className="w-full !ml-0 !text-sm btn-primary"
          onClick={() => navigate("/auth/rent-car/" + props.favs.car.id)}
        />
      </div>
    </div>
  );
}

export default FavoriteCard;
