import {useEffect, useState} from "react";
import RentEntity from "../../../Models/Rent.model";
import ReservationsService from "../../../Services/Reservation.service";
import Reservation from "./Components/Reservation";

export const Reservations = () => {
  const [rents, setRents] = useState([] as RentEntity[]);

  useEffect(() => {
    const fetchReservations = async () => {
      await ReservationsService.getReservationsByToken()
          .then((response) => {
            setRents(response?.data.content as RentEntity[]);
          })
          .catch((error) => {
            console.log(error);
          });
    };
      fetchReservations();
  }, []);

  return (
      <div className="w-full mx-auto max-w-[830px] mt-5 px-3 lg:p-0 border-box lg:border-content">
        {rents.map((reservation) => (
            <Reservation key={reservation.id} rent={reservation} />
        ))}
      </div>
  );

}

export default Reservations;