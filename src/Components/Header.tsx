import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useLocation, useNavigate } from "react-router";
import { useRef } from "react";
import { Menu } from "primereact/menu";

const logo = require("../Assets/logo.png");

interface HeaderProps {
  authenticated: boolean;
  onClickLoginButton?: () => void;
  showMenu?: boolean;
  onClickMenuButton?: () => void;
}

export const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const clientNames = JSON.parse(localStorage.getItem("CLIENT") || "{}").names;
  const location = useLocation();

  const menu = useRef<Menu>(null);
  const items = [
    {
      label: "Opciones",
      items: [
        {
          label: "Mi perfil",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("profile");
          },
        },
        {
          label: "Cerrar sesión",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            localStorage.clear();
            navigate("/");
          },
        },
      ],
    },
  ];

  const start = <img alt="logo" src={logo} />;
  const end = props.authenticated ? (
    <div className="flex w-full">
      {location.pathname !== "/auth/profile" && (
        <Button
          icon="pi pi-bars"
          className="p-button-text color-primary lg:!hidden"
          onClick={props.onClickMenuButton}
        />
      )}
      <Button
        icon="pi pi-heart-fill"
        className="!ml-auto !mr-3 btn-primary"
        onClick={() => navigate("favourites")}
      />

      <Menu model={items} popup ref={menu} id="popup_user_menu" />
      <Button
        id="popup_user_menu"
        label={clientNames}
        className="btn-secondary p-button-outlined"
        onClick={(e) => menu.current?.toggle(e)}
        aria-controls="popup_user_menu"
        aria-haspopup
      />
    </div>
  ) : (
    <Button
      label="Iniciar sesión"
      className="!ml-auto btn-primary"
      onClick={props.onClickLoginButton}
    />
  );

  return (
    <Menubar start={start} end={end} className="!fixed w-full !z-[1000]" />
  );
};

export default Header;
