import { useEffect, useState } from "react";
import RentsService from "../../../Services/Rent.service";
import RentEntity from "../../../Models/Rent.model";
import Rent from "./Components/Rent";

export const Rents = () => {
  const [rents, setRents] = useState([] as RentEntity[]);

  useEffect(() => {
    const fetchRents = async () => {
      await RentsService.getRentsByToken()
        .then((response) => {
          setRents(response?.data.content as RentEntity[]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchRents();
  }, []);

  return (
    <div className="w-full mx-auto max-w-[830px] mt-5 px-3 lg:p-0 border-box lg:border-content">
      {rents.map((rent) => (
        <Rent key={rent.id} rent={rent} />
      ))}
    </div>
  );
};

export default Rents;
