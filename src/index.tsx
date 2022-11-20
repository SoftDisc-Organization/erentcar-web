import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Freeviews from "./Pages/FreeViews/Freeviews";
import Authviews from "./Pages/AuthViews/Authviews";
import SearchCar from "./Pages/AuthViews/SearchCar/SearchCar";
import MyCars from "./Pages/AuthViews/MyCars/MyCars";
import Favourites from "./Pages/AuthViews/Favourites/Favourites";
import Rents from "./Pages/AuthViews/Rents/Rents";
import Reservations from "./Pages/AuthViews/Reservations/Reservations";
import Statistics from "./Pages/AuthViews/Statistics/Statistics";
import RentCar from "./Pages/AuthViews/RentCar/RentCar";
import Profile from "./Pages/AuthViews/Profile/Profile";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Freeviews />} />
        <Route path="auth/*" element={<Authviews />}>
          <Route index element={<SearchCar />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="rents" element={<Rents />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="rent-car" >
            <Route path=":carId" element={<RentCar />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
