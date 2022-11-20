import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../Services/Auth.service";
import ClientService from "../../../Services/Client.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface LoginFormProps {
  displayAuthForm: boolean;
  setDisplayAuthForm: (value: boolean) => void;
  setDisplayLoginForm: (value: boolean) => void;
}

type Inputs = {
  username: string;
  password: string;
};

const schema = yup.object({
    username: yup.string().required("El nombre de usuario es requerido"),
    password: yup.string().required("La contraseña es requerida"),
}).required();

export const LoginForm = (props: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toastLogin = useRef<Toast>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const showToastLoginSucess = () => {
    toastLogin.current?.show({
      severity: "success",
      summary: "Login",
      detail: "Login exitoso",
      life: 3000,
    });
  }

  const showToastLoginError = () => {
    toastLogin.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Usuario o contraseña incorrectos",
      life: 3000,
    });
  }

  const getClientInfo = async () => {
    await ClientService.getClientByToken()
      .then((response) => {
        localStorage.setItem("CLIENT", JSON.stringify(response.data));
        showToastLoginSucess();
      })
      .catch((error) => {
        showToastLoginError();
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await AuthService.login(data)
      .then(async (response) => {
        localStorage.setItem("TOKEN", response.data.resource.token);
        localStorage.setItem("USER", JSON.stringify(response.data.resource));
        await getClientInfo();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/auth");
      })
      .catch((error) => {
        showToastLoginError();
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <div>
      <Toast ref={toastLogin} position="bottom-right" />

      <h1 className="text-[32px] font-bold text-center mb-6">Iniciar sesión</h1>

      <form className="p-fluid w-[480px]" onSubmit={(e) => e.preventDefault()}>
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

        {loading ? (
          <div className="flex">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              className="!mt-6 !mx-auto"
            />
          </div>
        ) : (
          <Button
            label="Iniciar sesión"
            className="!mt-6 mb-auto btn-primary"
            onClick={handleSubmit(onSubmit)}
            disabled={ (errors.password || errors.username) && true }
          />
        )}
      </form>

      <div className="border border-x-0 border-b-0 border-t-1 border-t-[#C4C4C4] mt-40 box-border pt-3 text-center">
        ¿No tienes una cuenta?{" "}
        <span
          className="color-primary font-bold cursor-pointer"
          onClick={() => props.setDisplayLoginForm(false)}
        >
          Regístrate
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
