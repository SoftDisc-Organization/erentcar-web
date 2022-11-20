import CartCard from "./Components/CartCard";
import FavoritesService from "../../../Services/Favorites.service";
import CarsService from "../../../Services/Cars.service";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import CarEntity from "../../../Models/Car.model";
import { Dialog } from "primereact/dialog";
import RegisterCarForm from "./Components/RegisterCarForm";

export const MyCars = () => {
  const [loading, setLoading] = useState(true);
  const [arrayCars, setArrayClientCars] = useState<CarEntity[]>([]);
  const [displayAuthForm, setDisplayAuthForm] = useState(false);
  const toastCars = useRef<Toast>(null);

  const onClickLoginButton = () => {
    setDisplayAuthForm(true);
  };

  /*const showToastRegisterSucess = () => {
    toastCars.current?.show({
        severity: "success",
        summary: "Registro",
        detail: "Registro de carro exitoso",
        life: 3000,
    });
};*/

  const deleteData = async (id: number) => {
    await FavoritesService.delete(id).then(() => {
      fetchCars();
      toastCars.current?.show({
        severity: "error",
        summary: "DELETED",
        detail: "Favorite deleted",
        life: 3000,
      });
    });
  };

  const fetchCars = async () => {
    setLoading(true);
    await CarsService.getAllClientCars().then((res: any) => {
      setArrayClientCars(res.data.content);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col pt-[25px]">
      <Toast ref={toastCars} position="bottom-right" />
      <div className="max-w-[160px] mx-auto">
        <Button
        onClick={onClickLoginButton}
          label="Añadir nuevo auto"
          className="!ml-auto btn-primary p-button-sm"
        />
        <Dialog visible={displayAuthForm} onHide={() => setDisplayAuthForm(false)}>
          <RegisterCarForm
            displayAuthForm={displayAuthForm}
            setDisplayAuthForm={setDisplayAuthForm}
            fetchCars={fetchCars}
            carData={{}}
          />
        </Dialog>
      </div>

      {loading ? (
        <h1>Loading ...</h1>
      ) : !arrayCars ? (
        <h1>No Favorites added</h1>
      ) : (
        arrayCars.map((element) => (
          <CartCard
            key={element.id}
            car={element}
            deleteData={deleteData}
            fetchCars={fetchCars}
          />
        ))
      )}
    </div>
  );
}

export default MyCars;