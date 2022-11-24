import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CheckoutForm from "../../../Components/CheckoutForm";
import FavouriteButton from "../../../Components/FavouriteButton";
import CarEntity from "../../../Models/Car.model";
import User from "../../../Models/User.model";
import CarsService from "../../../Services/Cars.service";
import ClientService from "../../../Services/Client.service";
import PaymentsService from "../../../Services/Payments.service";
import RentService from "../../../Services/Rent.service";

const gearBoxIcon = require("../../../Assets/gearbox.png");

const stripePromise = loadStripe(
  "pk_test_51LxdH4I2LYtxNEDrHbqCWt1xkA17y0sWMiL8qZH5ftucNieV6vW2GLUMHzfKe0hwnrKzhILBDmzxWF78Z31O6ENV002PdpT2Jd"
);

export const PayRent = () => {
  const [loading, setLoading] = useState(true);
  let [searchParams] = useSearchParams();
  const [car, setCar] = useState({} as CarEntity);
  const [dates, setDates] = useState<Date[]>([]);
  const [days, setDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [displayRentSuccessDialog, setDisplayRentSuccessDialog] =
    useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [client] = useState<User>(
    JSON.parse(localStorage.getItem("CLIENT") || "")
  );
  const navigate = useNavigate();
  const { carId } = useParams();

  const createRent = async () => {
    const amount =
      searchParams.get("rentPerDay") === "true"
        ? days * car.rentAmountDay
        : parseInt(searchParams.get("kilometers") || "0") *
          car.rentAmountKilometer;

    await RentService.createRent({
      carId: car.id,
      amount: amount,
      rentPerDay: searchParams.get("rentPerDay") === "true",
      kilometers: parseInt(searchParams.get("kilometers") || "0"),
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

    if (searchParams.get("discount") !== "true") return;

    await ClientService.updateClient({
      ...client,
      accumulatedKilometers: 0,
    })
      .then((response) => {
        localStorage.setItem("CLIENT", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPaymentIntent = async () => {
    await PaymentsService.createPaymentIntent({
      amount: days * car.rentAmountDay,
    })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    fetchCar();

    const startDate = new Date(searchParams.get("startDate") as string);
    const finishDate = new Date(searchParams.get("finishDate") as string);
    setDates([startDate, finishDate]);

    const startDateTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    ).getTime();
    const finishDateTime = new Date(
      finishDate.getFullYear(),
      finishDate.getMonth(),
      finishDate.getDate()
    ).getTime();
    const days =
      Math.floor((finishDateTime - startDateTime) / (1000 * 60 * 60 * 24)) + 1;

    setDays(days);

    setTotalAmount(+(searchParams.get("totalAmount") || 0));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car]);

  // STRIPE
  const appearance: Appearance = {
    theme: "stripe",
  };

  let options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };
  // END STRIPE

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="w-full max-w-[830px] mx-auto mt-5 px-3 border-box lg:border-content">
          <div className="flex relative mb-5">
            <Button
              icon="pi pi-arrow-left"
              className="p-button-rounded p-button-outlined btn-secondary"
              aria-label="Submit"
              onClick={() => navigate("/auth/rent-car/" + carId)}
            />
            <h1 className="m-auto">Pagar renta</h1>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full max-w-[380px] bg-[#F3F1F1] rounded-lg mr-auto">
              <div className="lg:w-[380px] h-full bg-primary rounded-t-lg flex relative">
                <img
                  alt="car"
                  src={car.imagePath[0]}
                  className="my-auto w-full rounded-t-lg"
                />
                <FavouriteButton carId={car.id} />
              </div>
              <div className="lg:w-[380px] h-full border-box p-3 rounded-b-lg flex flex-col relative">
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
                <div className="border-t-2 border-[#C4C4C4] font-bold">
                  <h1 className="text-xl mt-3">Detalles del pago</h1>
                  <div className="flex mt-3">
                    <span>Rango de fechas</span>
                    <Calendar
                      id="range"
                      value={dates}
                      selectionMode="range"
                      readOnlyInput={true}
                      minDate={dates[0]}
                      maxDate={dates[1]}
                      className="ml-auto"
                    />
                  </div>
                  <div className="flex mt-3">
                    <span>Total a pagar</span>
                    <span className="ml-auto text-xl">S/ {totalAmount}</span>
                  </div>
                  <div className="flex mt-3 font-normal">
                    <span className="ml-auto">
                      {searchParams.get("rentPerDay") === "true"
                        ? "Renta por día"
                        : "Renta por kilometros"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm createRent={() => createRent()} />
              </Elements>
            )}
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

export default PayRent;
