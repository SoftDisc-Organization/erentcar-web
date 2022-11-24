import { InputNumber, InputSwitch } from "primereact";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Carousel } from "primereact/carousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavouriteButton from "../../../../Components/FavouriteButton";
import CarEntity from "../../../../Models/Car.model";
import User from "../../../../Models/User.model";

const gearBoxIcon = require("../../../../Assets/gearbox.png");

interface CarProps {
  loading: boolean;
  car: CarEntity;
}

export const Car = (props: CarProps) => {
  const [dates, setDates] = useState<Date[]>([new Date(), new Date()]);
  const [days, setDays] = useState(1);
  const [rentPerDay, setRentPerDay] = useState(true);
  const [discount, setDiscount] = useState(false);
  const [kilometers, setKilometers] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(
    props.car.rentAmountDay
  );
  const [client] = useState<User>(
    JSON.parse(localStorage.getItem("CLIENT") || "")
  );
  const navigate = useNavigate();

  const onChangeCalendar = (e: any) => {
    setDates(e.value);

    if (e.value.every((date: Date) => date instanceof Date)) {
      const startDate: number = new Date(
        e.value[0].getFullYear(),
        e.value[0].getMonth(),
        e.value[0].getDate()
      ).getTime();
      const endDate: number = new Date(
        e.value[1].getFullYear(),
        e.value[1].getMonth(),
        e.value[1].getDate()
      ).getTime();
      const days = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;
      setDays(days);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (rentPerDay) total = days * props.car.rentAmountDay;
    else {
      let km = kilometers;
      if (discount) km = Math.max(1, km - client.accumulatedKilometers);
      total = km * props.car.rentAmountKilometer;
    }
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, kilometers, rentPerDay, discount]);

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
    <>
      {props.loading ? (
        <>Loading...</>
      ) : (
        <div className="mt-5">
          <div className="grid grid-cols-2 gird-rows-2 lg:flex w-full lg:h-[380px] mb-5 bg-[#F3F1F1] rounded-lg">
            <div className="col-span-1 lg:w-[220px] h-full bg-primary rounded-l-lg flex relative">
              <Carousel
                value={props.car.imagePath}
                numVisible={1}
                numScroll={1}
                orientation="vertical"
                verticalViewPortHeight="150px"
                itemTemplate={imageCarouselTemplate}
              />
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
            <div className="col-span-2 flex flex-col lg:w-[370px] h-full border-t-2 lg:border-t-0 lg:border-l-2 border-[#C4C4C4] box-border p-3 col-span-2 font-bold">
              <h1 className="text-xl">Detalles del precio</h1>
              <div className="flex mt-4">
                {rentPerDay ? "Renta por dia" : "Renta por kilometros"}
                <InputSwitch
                  checked={rentPerDay}
                  onChange={(e) => setRentPerDay(e.value)}
                  className="ml-auto"
                />
              </div>
              <div className="flex mt-4">
                {rentPerDay ? "Tarifa por dia" : "Tarifa por kilometros"}
                <span className="ml-auto text-xl">
                  S/{" "}
                  {rentPerDay
                    ? props.car.rentAmountDay
                    : props.car.rentAmountKilometer}
                </span>
              </div>
              {!rentPerDay && (
                <div className="flex mt-4">
                  Kilometros
                  <InputNumber
                    value={kilometers}
                    onValueChange={(e) => setKilometers(e.value || 0)}
                    className="ml-auto"
                  />
                </div>
              )}
              <div className="flex mt-4">
                <span>Rango de fechas</span>
                <Calendar
                  id="range"
                  value={dates}
                  onChange={onChangeCalendar}
                  selectionMode="range"
                  readOnlyInput
                  minDate={new Date()}
                  className="ml-auto"
                />
              </div>
              {!rentPerDay && (
                <div className="flex mt-4">
                  Descuento
                  <InputSwitch
                    checked={discount}
                    onChange={(e) => setDiscount(e.value)}
                    className="ml-auto"
                  />
                </div>
              )}
              <div className="flex mt-4 pt-4 border-t-2 border-[#C4C4C4]">
                <span>Total a pagar</span>
                <span className="ml-auto text-xl">
                  S/
                  {" " +
                    (!Number.isNaN(totalAmount)
                      ? totalAmount
                      : props.car.rentAmountDay)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex">
            <Button
              label="Rentar"
              className="btn-primary !mx-auto"
              onClick={() =>
                navigate(
                  "pay-rent?totalAmount=" +
                    totalAmount +
                    "&rentPerDay=" +
                    rentPerDay +
                    "&discount=" +
                    discount +
                    "&kilometers=" +
                    (discount
                      ? Math.max(1, kilometers - client.accumulatedKilometers)
                      : kilometers) +
                    "&startDate=" +
                    dates[0] +
                    "&finishDate=" +
                    dates[1]
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Car;
