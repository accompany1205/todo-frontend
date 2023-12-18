import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./Header";
import { AuthContext } from "../../contexts/AuthContext";

const DefaultLayout = () => {
  const { modalShow } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen relative">
      <HeaderComponent />
      <Outlet />
      {modalShow && (
        <div className="fixed w-[30%] bg-black left-[35%] top-[calc(50vh-150px)] h-[300px]">
          adsfasdfasd
        </div>
      )}
    </div>
  );
};
export default DefaultLayout;
