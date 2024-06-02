/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@material-tailwind/react";
const Strength = ({ password }) => {
  const getPasswordStrength = () => {
    const passwordLength = password.length;

    if (passwordLength < 1) {
      return "";
    } else if (passwordLength < 4) {
      return "Very weak";
    } else if (passwordLength < 8) {
      return "Poor";
    } else if (passwordLength < 12) {
      return "Medium";
    } else if (passwordLength < 16) {
      return "Strong";
    } else {
      return "Very strong";
    }
  };

  const passwordStren = getPasswordStrength();

  if (!passwordStren) return <React.Fragment />;
  return (
    <div className="md:flex justify-between items-center ml-2 mt-1">
      <div>
        <Typography variant="small" color="white" className="mb-3 text-center">
          Strength :
          <span className="text-md font-bold pl-3 text-[#3e4492]">
            {passwordStren}
          </span>
        </Typography>
      </div>

      <div className="flex space-x-1 ">
        <div
          className={`h-2 w-8 rounded ${
            password.length >= 1 ? "bg-red-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-2 w-8 rounded ${
            password.length >= 5 ? "bg-orange-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-2 w-8 rounded ${
            password.length >= 9 ? "bg-yellow-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-2 w-8 rounded ${
            password.length >= 13 ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-2 w-8 rounded ${
            password.length >= 17 ? "bg-green-700" : "bg-gray-300"}`}></div>
      </div>
    </div>
  );
};

export default Strength;
