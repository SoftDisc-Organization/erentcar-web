import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toast } from "primereact/toast";
import AuthService from "../../../Services/Auth.service";
import { Role } from "../../../Models/Role.enum";
import { ProgressSpinner } from "primereact/progressspinner";
import ClientService from "../../../Services/Client.service";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  displayAuthForm: boolean;
  setDisplayAuthForm: (value: boolean) => void;
  setDisplayLoginForm: (value: boolean) => void;
}

type Inputs = {
  username: string;
  password: string;
  email: string;
  names: string;
  lastNames: string;
  address: string;
  cellphoneNumber: number;
  imagePath: string;
};

const schema = yup
  .object({
    username: yup.string().required("El nombre de usuario es requerido"),
    password: yup
      .string()
      .required("La contraseña es requerida"),
    email: yup
      .string()
      .email("Correo electrónico inválido")
      .required("El email es requerido"),
    names: yup.string().required("Los nombres son requeridos"),
    lastNames: yup.string().required("Los apellidos son requeridos"),
    address: yup.string().required("La dirección es requerida"),
    cellphoneNumber: yup
      .number()
      .min(900000000)
      .max(999999999)
      .required("El teléfono es requerido"),
    imagePath: yup
      .string()
      .required("La URL de la imagen de perfil es requerida"),
  })
  .required();

export const RegisterForm = (props: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayGeneralInformationForm, setDisplayGeneralInformationForm] =
    useState(true);
  const toastRegister = useRef<Toast>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const showToastInvalidForm = () => {
    toastRegister.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Formulario inválido",
      life: 3000,
    });
  };

  const showToastRegisterSucess = () => {
    toastRegister.current?.show({
      severity: "success",
      summary: "Registro",
      detail: "Registro de usuario exitoso",
      life: 3000,
    });
  };

  const showToastRegisterError = () => {
    toastRegister.current?.show({
      severity: "error",
      summary: "Registro",
      detail: "Error al registrar al usuario",
      life: 3000,
    });
  };

  const createClient = async (data: Inputs) => {
    await ClientService.createClient({
      ...data,
      averageResponsibility: 0,
      responseTime: 0,
      rate: 0,
    })
      .then((response) => {
        localStorage.setItem("CLIENT", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await AuthService.register({ ...data, roles: [Role.USER] })
      .then(async (response) => {
        localStorage.setItem("TOKEN", response.data.resource.token);
        localStorage.setItem("USER", JSON.stringify(response.data.resource));
        await createClient(data);
        showToastRegisterSucess();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/auth");
      })
      .catch((error) => {
        console.log(error);
        showToastRegisterError();
      });
    setLoading(false);
  };

  useEffect(() => {
    //if there are errors, show the general information form
    if (Object.keys(errors).length > 0) {
      showToastInvalidForm();
      setDisplayGeneralInformationForm(true);
    }
  }, [errors]);

  return (
    <div>
      <Toast ref={toastRegister} position="bottom-right" />

      <h1 className="text-[32px] font-bold text-center mb-4">Registrarse</h1>
      <form className="p-fluid w-[480px]" onSubmit={(e) => e.preventDefault()}>
        {displayGeneralInformationForm ? (
          <div>
            <h2 className="font-bold mb-4">Información de la cuenta</h2>

            <div>
              <label htmlFor="username" className="block">
                Usuario
              </label>
              <InputText
                id="username"
                placeholder="Ingrese su nombre de usuario"
                disabled={loading}
                className={errors.username && "p-invalid"}
                {...register("username")}
              />
              {errors.username && (
                <small id="username-help" className="p-error block">
                  {errors.username?.message}
                </small>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="email" className="block">
                Correo electrónico
              </label>
              <InputText
                id="email"
                placeholder="Ingrese su correo electrónico"
                disabled={loading}
                className={errors.email && "p-invalid"}
                {...register("email")}
              />
              {errors.email && (
                <small id="email-help" className="p-error block">
                  {errors.email?.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mt-3">
                Contraseña
              </label>
              <div className="p-inputgroup">
                <InputText
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  disabled={loading}
                  className={errors.password && "p-invalid"}
                  {...register("password")}
                />

                {showPassword ? (
                  <Button
                    className="pi pi-eye-slash btn-primary"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Button
                    typeof="button"
                    className="pi pi-eye btn-primary"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <small id="password-help" className="p-error block">
                  {errors.password?.message}
                </small>
              )}
            </div>

            <Button
              label="Siguiente"
              className="!mt-6 mb-auto btn-primary"
              onClick={() => setDisplayGeneralInformationForm(false)}
            />
          </div>
        ) : (
          <div>
            <h2 className="font-bold mb-4">Información personal</h2>

            <div>
              <label htmlFor="names" className="block">
                Nombres
              </label>
              <InputText
                id="names"
                placeholder="Ingrese sus nombres"
                disabled={loading}
                className={errors.names && "p-invalid"}
                defaultValue=""
                {...register("names")}
              />
              {errors.names && (
                <small id="names-help" className="p-error block">
                  {errors.names?.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="lastnames" className="block mt-3">
                Apellidos
              </label>
              <InputText
                id="lastnames"
                placeholder="Ingrese sus apellidos"
                disabled={loading}
                className={errors.lastNames && "p-invalid"}
                defaultValue=""
                {...register("lastNames")}
              />
              {errors.lastNames && (
                <small id="lastnames-help" className="p-error block">
                  {errors.lastNames?.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block mt-3">
                Dirección
              </label>
              <InputText
                id="address"
                placeholder="Ingrese su dirección"
                disabled={loading}
                className={errors.address && "p-invalid"}
                {...register("address")}
              />
              {errors.address && (
                <small id="address-help" className="p-error block">
                  {errors.address?.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="cellphoneNumber" className="block mt-3">
                Teléfono
              </label>
              <InputText
                id="cellphoneNumber"
                placeholder="Ingrese su teléfono"
                disabled={loading}
                className={errors.cellphoneNumber && "p-invalid"}
                {...register("cellphoneNumber")}
                type="number"
                min={900000000}
                max={999999999}
                defaultValue={900000000}
              />
              {errors.cellphoneNumber && (
                <small id="cellphoneNumber-help" className="p-error block">
                  {errors.cellphoneNumber?.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="profile" className="block mt-3">
                URL de imagen de perfil
              </label>
              <InputText
                id="profile"
                placeholder="Ingrese la URL de su imagen de perfil"
                disabled={loading}
                className={errors.imagePath && "p-invalid"}
                {...register("imagePath")}
              />
              {errors.imagePath && (
                <small id="profile-help" className="p-error block">
                  {errors.imagePath?.message}
                </small>
              )}
            </div>

            {loading ? (
              <div className="flex">
                <ProgressSpinner
                  style={{ width: "50px", height: "50px" }}
                  strokeWidth="4"
                  className="!mt-6 !mx-auto"
                />
              </div>
            ) : (
              <>
                <Button
                  label="Registrarse"
                  className="!mt-6 mb-auto btn-primary"
                  onClick={handleSubmit(onSubmit)}
                />

                <Button
                  label="Regresar"
                  className="!mt-2 mb-auto p-button-outlined btn-secondary"
                  onClick={() => setDisplayGeneralInformationForm(true)}
                />
              </>
            )}
          </div>
        )}
      </form>

      <div className="border border-x-0 border-b-0 border-t-1 border-t-[#C4C4C4] mt-6 box-border pt-3 text-center">
        ¿Ya tienes una cuenta?{" "}
        <span
          className="color-primary font-bold cursor-pointer"
          onClick={() => props.setDisplayLoginForm(true)}
        >
          Iniciar sesión
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
