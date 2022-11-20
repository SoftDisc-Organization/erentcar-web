import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../../Components/Header";
import SidebarMenu from "../../Components/SidebarMenu";

export const Authviews = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isAuth = localStorage.getItem("TOKEN") ? true : false;
  const location = useLocation();

  return (
    <>
      {isAuth ? (
        <div className="flex flex-col h-full">
          <Header
            authenticated={true}
            onClickMenuButton={() => setShowMenu(!showMenu)}
          />
          <div className="flex h-full relative mt-[68px]">
            {location.pathname !== "/auth/profile" && (
              <SidebarMenu showMenu={showMenu} />
            )}
            <div
              className={
                "flex flex-col auth-content w-full " +
                (showMenu ? "active " : "") +
                (location.pathname === "/auth/profile" ? "!ml-0" : "")
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Authviews;
