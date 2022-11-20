import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import CarEntity from "../../../../Models/Car.model";
import User from "../../../../Models/User.model";

interface CarProps {
  car: CarEntity;
}

const Car = (props: CarProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-[240px] mb-5 mx-auto">
      <div className="flex h-[270px] bg-[#D0EFFF] rounded-md">
        <img alt="car" src={props.car.imagePath} className="m-auto" />
      </div>
      <h1 className="font-bold my-2">
        {props.car.carModel.carBrand.name} {props.car.carModel.name}
      </h1>
      <div className="flex">
        <p className="my-auto">S/ {props.car.rentAmountDay}</p>
        <Button label="Ver detalles" className="!ml-auto btn-primary" onClick={() => navigate("/auth/my-cars")}/>
      </div>
    </div>
  );
};

interface MyCarsProps {
  client: User;
}

export const MyCars = (props: MyCarsProps) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3">
      {props.client.cars.map((car: CarEntity) => {
        return <Car key={car.id} car={car} />;
      })}
    </div>
  );
};

export default MyCars;
