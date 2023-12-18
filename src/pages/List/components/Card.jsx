import React from "react";
import { Link } from "react-router-dom";

const CardComponent = ({ avatar, name, role }) => {
    
  return (
    <div className="relative flex justify-center rounded-lg bg-[#D9D9D9] py-4">
      <div className="text-center">
        <div className="my-2">
          <img src={avatar} alt="avatar img" />
        </div>
        <div className="mb-2 text-black">
          <h3 className="text-xl font-bold m-0">{name}</h3>
          <p className="text-base font-medium m-0">Id: OEI-00002</p>
        </div>
        <p className="text-base font-medium m-0 text-black mb-2">
          Role: <span className="text-[#7387FF]">{role}</span>
        </p>
        <Link to="/home">
          <div className="bg-[#32328E] rounded-[20px] flex items-stretch justify-start">
            <div className="rounded-[50%] bg-[#7387FF]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6895 11.25H3.75C3.55109 11.25 3.36032 11.329 3.21967 11.4696C3.07902 11.6103 3 11.8011 3 12C3 12.1989 3.07902 12.3896 3.21967 12.5303C3.36032 12.671 3.55109 12.75 3.75 12.75H17.6895L12.219 18.219C12.0782 18.3598 11.9991 18.5508 11.9991 18.75C11.9991 18.9491 12.0782 19.1401 12.219 19.281C12.3598 19.4218 12.5508 19.5009 12.75 19.5009C12.9492 19.5009 13.1402 19.4218 13.281 19.281L20.031 12.531C20.1008 12.4613 20.1563 12.3785 20.1941 12.2874C20.2319 12.1963 20.2513 12.0986 20.2513 12C20.2513 11.9013 20.2319 11.8036 20.1941 11.7125C20.1563 11.6214 20.1008 11.5386 20.031 11.469L13.281 4.71897C13.1402 4.57814 12.9492 4.49902 12.75 4.49902C12.5508 4.49902 12.3598 4.57814 12.219 4.71897C12.0782 4.8598 11.9991 5.05081 11.9991 5.24997C11.9991 5.44913 12.0782 5.64014 12.219 5.78097L17.6895 11.25Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center text-base font-bold text-white mx-3">
              See Details
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardComponent;
