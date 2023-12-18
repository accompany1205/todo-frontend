import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import HeaderLogo from "../../assets/header/logo.png";

const HeaderComponent = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between pr-8 min-h-full">
      <img src={HeaderLogo} alt="header logo" />
      <div className="flex items-center">
        <p className="text-2xl font-bold m-0 mr-12 text-[#32328E] hover:text-gray-300 border-b-solid border-b-4 border-b-[#32328E] hover:border-b-gray-300 pb-2 mt-3 cursor-pointer ">
          Tasks
        </p>
        <p className="text-2xl font-bold m-0 mr-12 text-[#32328E] hover:text-gray-300 border-b-solid border-b-4 border-b-[#32328E] hover:border-b-gray-300 pb-2 mt-3 cursor-pointer ">
          Teams
        </p>
        <p className="text-2xl font-bold m-0 mr-12 text-[#32328E] hover:text-gray-300 border-b-solid border-b-4 border-b-[#32328E] hover:border-b-gray-300 pb-2 mt-3 cursor-pointer ">
          Users
        </p>
        <p className="text-2xl font-bold m-0 mr-12 text-[#32328E] hover:text-gray-300 border-b-solid border-b-4 border-b-[#32328E] hover:border-b-gray-300 pb-2 mt-3 cursor-pointer ">
          Profie
        </p>
      </div>
      <div className="flex items-center justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          className="mr-6 cursor-pointer"
          viewBox="0 0 1188 1000"
          onClick={() => logOut()}
        >
          <path
            fill="#32328E"
            d="m912 236l276 266l-276 264V589H499V413h413zM746 748l106 107q-156 146-338 146q-217 0-365.5-143.5T0 499q0-135 68-250T251.5 67.5T502 1q184 0 349 148L746 255Q632 151 503 151q-149 0-251.5 104T149 509q0 140 105.5 241T502 851q131 0 244-103"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeaderComponent;
