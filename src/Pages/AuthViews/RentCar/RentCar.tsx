import { Button } from "primereact/button";
import Car from "./Components/Car";
import { useNavigate } from "react-router-dom";

export const RentCar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[830px] mx-auto mt-5 px-3 border-box lg:border-content">
      <div className="flex relative">
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-outlined btn-secondary"
          aria-label="Submit"
          onClick={() => navigate("/auth")}
        />
        <h1 className="m-auto">Rentar auto</h1>
      </div>

      <div className="mt-5">
        <Car />
      </div>
    </div>
  );
};

export default RentCar;
