import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

interface SidebarMenuProps {
  showMenu: boolean;
}

export const SidebarMenu = (props: SidebarMenuProps) => {
  const navigate = useNavigate();

  const items = [
    {
      items: [
        {
          label: "Buscar autos",
          icon: "pi pi-search",
          command: () => {
            navigate("");
          },
        },
        {
          label: "Mis autos",
          icon: "pi pi-car",
          command: () => {
            navigate("my-cars");
          },
        },
        {
          label: "Mis favoritos",
          icon: "pi pi-heart",
          command: () => {
            navigate("favourites");
          },
        },
        {
          label: "Mis rentas",
          icon: "pi pi-key",
          command: () => {
            navigate("rents");
          },
        },
        {
          label: "Mis reservas",
          icon: "pi pi-calendar",
          command: () => {
            navigate("reservations");
          },
        },
        {
          label: "Mis estadísticas",
          icon: "pi pi-chart-bar",
          command: () => {
            navigate("statistics");
          },
        },
      ],
    },
  ];

  return (
    <Menu
      model={items}
      className={"navigation-menu !fixed " + (props.showMenu ? "active " : "")}
    />
  );
};

export default SidebarMenu;
