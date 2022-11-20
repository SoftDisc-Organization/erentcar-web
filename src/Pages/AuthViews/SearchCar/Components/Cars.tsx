import { useEffect, useState } from "react";
import CarEntity from "../../../../Models/Car.model";
import SearchCarFilters from "../../../../Models/SearchCarFilters.model";
import CarsService from "../../../../Services/Cars.service";
import Car from "./Car";

interface CarsProps {
  filters: SearchCarFilters;
}

export const Cars = (props: CarsProps) => {
  const [cars, setCars] = useState([] as CarEntity[]);

  useEffect(() => {
    const fetchCars = async () => {
      await CarsService.searchCars(props.filters)
        .then(response => {
          setCars(response?.data.content as CarEntity[]);
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchCars();
  }, [props.filters]);

  return (
    <div className="w-full mx-auto lg:ml-5 max-w-[600px] px-3 lg:p-0 border-box lg:border-content">
      {cars.map((car) => (
        <Car key={car.id} car={car} />
      ))}
    </div>
  );
}

export default Cars;