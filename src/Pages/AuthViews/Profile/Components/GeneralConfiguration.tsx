import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm, SubmitHandler } from "react-hook-form";
import User from "../../../../Models/User.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import ClientService from "../../../../Services/Client.service";

interface GeneralConfigurationProps {
  client: User;
  updateClient: () => void;
}

type Inputs = {
  names: string;
  lastNames: string;
  cellphoneNumber: string;
};

const schema = yup
  .object({
    names: yup.string().required("El nombre es requerido"),
    lastNames: yup.string().required("El apellido es requerido"),
    cellphoneNumber: yup.number().required("El número de celular es requerido"),
  })
  .required();

export const GeneralConfiguration = (props: GeneralConfigurationProps) => {
  const [client, setClient] = useState(Object.assign({}, props.client));
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await ClientService.updateClient({
      ...client,
      names: data.names,
      lastNames: data.lastNames,
      cellphoneNumber: +data.cellphoneNumber,
    })
      .then((response) => {
        localStorage.setItem("CLIENT", JSON.stringify(response.data));
        setClient(response.data);
        props.updateClient();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsEdit(!isEdit);
  };

  const handleCancelEdit = () => {
    setIsEdit(!isEdit);
    setClient(Object.assign({}, props.client));
  };

  return (
    <div className="border-box p-3 border rounded-md">
      <h1 className="text-xl font-bold mb-3">Información personal</h1>
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="names" className="block">
            Nombres
          </label>
          <InputText
            id="names"
            value={client.names}
            className="w-[300px]"
            {...register("names")}
            onChange={(e) => setClient({ ...client, names: e.target.value })}
            readOnly={!isEdit}
          />
          {errors.names && (
            <small id="username-help" className="p-error block">
              {errors.names?.message}
            </small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastNames" className="block">
            Apellidos
          </label>
          <InputText
            id="lastNames"
            value={client.lastNames}
            className="w-[300px]"
            {...register("lastNames")}
            onChange={(e) =>
              setClient({ ...client, lastNames: e.target.value })
            }
            readOnly={!isEdit}
          />
          {errors.lastNames && (
            <small id="username-help" className="p-error block">
              {errors.lastNames?.message}
            </small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="cellphone" className="block">
            Número telefónico
          </label>
          <InputText
            id="cellphone"
            value={client.cellphoneNumber}
            className="w-[300px]"
            {...register("cellphoneNumber")}
            onChange={(e) =>
              setClient({ ...client, cellphoneNumber: +e.target.value })
            }
            readOnly={!isEdit}
          />
          {errors.cellphoneNumber && (
            <small id="username-help" className="p-error block">
              {errors.cellphoneNumber?.message}
            </small>
          )}
        </div>
        {isEdit ? (
          <div className="mx-auto">
            <Button
              label="Guardar"
              className="w-[110px] btn-primary !mr-3"
              onClick={handleSubmit(onSubmit)}
            />
            <Button
              label="Cancelar"
              className="w-[110px] p-button-danger"
              onClick={handleCancelEdit}
            />
          </div>
        ) : (
          <Button
            label="Editar"
            className="w-[100px] btn-primary !mx-auto"
            onClick={() => setIsEdit(!isEdit)}
          />
        )}
      </form>
    </div>
  );
};

export default GeneralConfiguration;
