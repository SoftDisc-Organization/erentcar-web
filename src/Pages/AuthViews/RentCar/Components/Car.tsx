import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FavouriteButton from "../../../../Components/FavouriteButton";
import CarEntity from "../../../../Models/Car.model";
import CarsService from "../../../../Services/Cars.service";
import RentService from "../../../../Services/Rent.service";

const gearBoxIcon = require("../../../../Assets/gearbox.png");

export const Car = () => {
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState<Date[]>([new Date(), new Date()]);
  const [days, setDays] = useState(1);
  const [car, setCar] = useState({} as CarEntity);
  const [displayRentSuccessDialog, setDisplayRentSuccessDialog] =
    useState(false);

  const { carId } = useParams();
  const navigate = useNavigate();

  const fetchCar = async () => {
    setLoading(true);
    await CarsService.getCarById((carId || 0) as number)
      .then((response) => {
        setCar(response.data as CarEntity);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const createRent = async () => {
    await RentService.createRent({
      carId: car.id,
      amount: days * car.rentAmountDay,
      rate: 0,
      startDate: dates[0],
      finishDate: dates[1],
    })
      .then((response) => {
        setDisplayRentSuccessDialog(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          <div className="grid grid-cols-2 gird-rows-2 lg:flex w-full lg:h-[300px] mb-5 bg-[#F3F1F1] rounded-lg">
            <div className="col-span-1 lg:w-[220px] h-full bg-primary rounded-l-lg flex relative">
              <img alt="car" src={car.imagePath} className="my-auto w-full" />
              <FavouriteButton carId={car.id} />
            </div>
            <div className="col-span-1 lg:w-[240px] box-border p-3 text-sm">
              <div className="border-b-2 border-[#C4C4C4]">
                <h1 className="font-bold text-xl">
                  {car.carModel.carBrand.name} {car.carModel.name}
                </h1>
                <div className="my-3">
                  <span className="mr-5">
                    <i className="pi pi-user mr-3" />
                    <span>{car.seating}</span>
                  </span>
                  <span>
                    <img
                      alt="gearbox"
                      src={gearBoxIcon}
                      className="w-[16px] h-[16px] my-auto mr-3 inline"
                    />
                    <span>{car.manual ? "M" : "A"}</span>
                  </span>
                </div>
              </div>
              <div className="border-b-2 border-[#C4C4C4] py-3 mb-3">
                <i className="pi pi-map" />
                <span className="ml-2">{car.address}</span>
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
                <span>Tarifa por día</span>
                <span className="ml-auto text-xl">S/ {car.rentAmountDay}</span>
              </div>
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
              <div className="flex mt-4 pt-4 border-t-2 border-[#C4C4C4]">
                <span>Total a pagar</span>
                <span className="ml-auto text-xl">
                  S/ {days * car.rentAmountDay}
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <Button
              className="btn-primary !mx-auto"
              onClick={() => createRent()}
            >
              Rentar
            </Button>
          </div>

          <Dialog
            visible={displayRentSuccessDialog}
            onHide={() => navigate("/auth")}
          >
            <h1 className="text-xl font-bold text-center">Muchas gracias</h1>
            <p className="my-5">Gracias por confiar en nuestro servicio.</p>
            <div className="flex flex-col">
              <Button
                label="Ver renta"
                className="btn-primary"
                onClick={() => navigate("/auth/rents")}
              />
              <Button
                label="Volver a la sección principal"
                className="p-button-outlined btn-secondary !mt-3"
                onClick={() => navigate("/auth")}
              />
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Car;
