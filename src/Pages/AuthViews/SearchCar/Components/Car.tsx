import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import CarEntity from "../../../../Models/Car.model";
import { useNavigate } from "react-router-dom";
import FavouriteButton from "../../../../Components/FavouriteButton";

const gearBoxIcon = require("../../../../Assets/gearbox.png");

interface CarProps {
  car: CarEntity;
}

export const Car = (props: CarProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gird-rows-2 lg:flex w-full lg:w-[600px] lg:h-[300px] mb-5 bg-[#F3F1F1] rounded-lg">
      <div className="col-span-1 lg:w-[220px] h-full bg-primary rounded-l-lg flex relative">
        <img alt="car" src={props.car.imagePath} className="my-auto" />
        <FavouriteButton carId={props.car.id} />
      </div>
      <div className="col-span-1 lg:w-[240px] box-border p-3 text-sm">
        <div className="border-b-2 border-[#C4C4C4]">
          <h1 className="font-bold text-xl">
            {props.car.carModel.carBrand.name} {props.car.carModel.name}
          </h1>
          <div className="my-3">
            <span className="mr-5">
              <i className="pi pi-user mr-3" />
              <span>{props.car.seating}</span>
            </span>
            <span>
              <img
                alt="gearbox"
                src={gearBoxIcon}
                className="w-[16px] h-[16px] my-auto mr-3 inline"
              />
              <span>{props.car.manual ? "M" : "A"}</span>
            </span>
          </div>
        </div>
        <div className="border-b-2 border-[#C4C4C4] py-3 mb-3">
          <i className="pi pi-map" />
          <span className="ml-2">{props.car.address}</span>
        </div>
        <div className="grid grid-cols-2">
          <ul className="!list-disc pl-5 text-sm">
            <li>Seguro contra accidentes</li>
            <li>Seguro contra robos</li>
          </ul>
          <ul className="!list-disc pl-5 text-sm">
            <li>Limpieza profunda</li>
          </ul>
        </div>
      </div>
      <div className="col-span-2 flex lg:flex-col lg:w-[140px] h-full border-t-2 lg:border-t-0 lg:border-l-2 border-[#C4C4C4] box-border p-3 col-span-2">
        <p className="text-xl font-bold my-auto ml-auto lg:ml-0 lg:my-0 lg:mt-auto">
          S/ {props.car.rentAmountDay}
        </p>
        <p className="my-auto ml-2 lg:ml-0 lg:my-2">Por día</p>
        <Button
          label="Ver oferta"
          className="lg:w-full !ml-5 lg:!ml-0 !text-sm btn-primary"
          onClick={() => navigate("rent-car/" + props.car.id)}
        />
      </div>
    </div>
  );
};

export default Car;
