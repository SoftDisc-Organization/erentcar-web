import RentEntity from "../../../../Models/Rent.model";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import FavouriteButton from "../../../../Components/FavouriteButton";

const gearBoxIcon = require("../../../../Assets/gearbox.png");

interface RentProps {
  rent: RentEntity;
}

export const Rent = (props: RentProps) => {
  const [dates] = useState<Date[]>([
    new Date(props.rent.startDate),
    new Date(props.rent.finishDate),
  ]);

  return (
    <div className="grid grid-cols-2 gird-rows-2 lg:flex w-full lg:h-[300px] mb-5 bg-[#F3F1F1] rounded-lg">
      <div className="col-span-1 lg:w-[220px] h-full bg-primary rounded-l-lg flex relative">
        <img
          alt="car"
          src={props.rent.car.imagePath}
          className="my-auto w-full"
        />
        <FavouriteButton carId={props.rent.car.id} />
      </div>
      <div className="col-span-1 lg:w-[240px] box-border p-3 text-sm">
        <div className="border-b-2 border-[#C4C4C4]">
          <h1 className="font-bold text-xl">
            {props.rent.car.carModel.carBrand.name}{" "}
            {props.rent.car.carModel.name}
          </h1>
          <div className="my-3">
            <span className="mr-5">
              <i className="pi pi-user mr-3" />
              <span>{props.rent.car.seating}</span>
            </span>
            <span>
              <img
                alt="gearbox"
                src={gearBoxIcon}
                className="w-[16px] h-[16px] my-auto mr-3 inline"
              />
              <span>{props.rent.car.manual ? "M" : "A"}</span>
            </span>
          </div>
        </div>
        <div className="border-b-2 border-[#C4C4C4] py-3 mb-3">
          <i className="pi pi-map" />
          <span className="ml-2">{props.rent.car.address}</span>
        </div>
        <ul className="list-disc pl-5 text-sm">
          <li>{props.rent.car.extraInformation}</li>
        </ul>
      </div>
      <div className="col-span-2 flex flex-col lg:w-[370px] h-full border-t-2 lg:border-t-0 lg:border-l-2 border-[#C4C4C4] box-border p-3 col-span-2 font-bold">
        <h1 className="text-xl">Detalles de la renta</h1>
        <div className="flex mt-4">
          <span>Tarifa por día</span>
          <span className="ml-auto text-xl">
            S/ {props.rent.car.rentAmountDay}
          </span>
        </div>
        <div className="flex mt-4">
          <span>Rango de fechas</span>
          <Calendar
            id="range"
            value={dates}
            selectionMode="range"
            readOnlyInput={true}
            minDate={new Date(props.rent.startDate)}
            maxDate={new Date(props.rent.finishDate)}
            className="ml-auto"
          />
        </div>
        <div className="flex mt-4 pt-4 border-t-2 border-[#C4C4C4]">
          <span>Total pagado</span>
          <span className="ml-auto text-xl">S/ {props.rent.amount}</span>
        </div>
        <div className="flex items-center justify-between mt-10">
          <p className="pr-[20px]">Estado de renta</p>
          {props.rent.car.active ? (
            <div className="rounded-2xl px-4 py-1 content-end bg-[#22C55E]  text-white">
              Activo
            </div>
          ) : (
            <div className="rounded-2xl px-4 py-1 content-end bg-[#EF4444] text-white">
              Finalizado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rent;
