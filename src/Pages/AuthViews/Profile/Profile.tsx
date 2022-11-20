import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import { useNavigate } from "react-router";
import User from "../../../Models/User.model";
import GeneralConfiguration from "./Components/GeneralConfiguration";
import MyCars from "./Components/MyCars";

export const Profile = () => {
  const [client, setClient] = useState<User>(
    JSON.parse(localStorage.getItem("CLIENT") || "")
  );
  const [user] = useState(JSON.parse(localStorage.getItem("USER") || ""));
  const navigate = useNavigate();

  const updateClient = () => {
    setClient(JSON.parse(localStorage.getItem("CLIENT") || ""));
  };

  return (
    <div>
      <div className="bg-[#F3F1F1]">
        <div className="border-box px-3 lg:w-[950px] mx-auto">
          <div className="md:h-[330px]">
            <div className="flex relative py-5">
              <Button
                icon="pi pi-arrow-left"
                className="p-button-rounded p-button-outlined btn-secondary !bg-white"
                aria-label="Submit"
                onClick={() => navigate("/auth")}
              />
              <h1 className="m-auto">Mi perfil</h1>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col">
                <h1 className="mx-auto md:mx-0 text-3xl font-bold mb-5 text-center md:text-left">
                  Hola {client.names} {client.lastNames}
                </h1>
                <div className="flex mx-auto">
                  <ul className="mr-16">
                    <li className="mb-3">
                      <p>Usuario</p>
                      <p className="font-bold">{user.username}</p>
                    </li>
                    <li>
                      <p>Email</p>
                      <p className="font-bold">{user.email}</p>
                    </li>
                  </ul>
                  <ul>
                    <li className="mb-3">
                      <p>Número telefónico</p>
                      <p className="font-bold">{client.cellphoneNumber}</p>
                    </li>
                    <li>
                      <p>Dirección</p>
                      <p className="font-bold">{client.address}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mx-auto my-5 md:m-0 md:ml-auto">
                <img
                  alt="profile"
                  src={client.imagePath}
                  className="w-[222px] h-[222px] bg-[#D9D9D9] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[950px] mx-auto">
        <TabView className="color-primary">
          <TabPanel header="Configuración general">
            <GeneralConfiguration client={client} updateClient={updateClient} />
          </TabPanel>
          <TabPanel header="Mis autos">
            <MyCars client={client} />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Profile;
