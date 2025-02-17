import React, { useRef } from "react";
// import woxsenlogo from "../../Assests/WoxsenLogo/woxsenlogo1.svg";
import woxsenlogo from "../../Assests/logo/woxsenlogo.webp"
import { AiOutlineClose } from "react-icons/ai";

interface AdminSignInProps {
  onClose: () => void;
}

const AdminSignIn: React.FC<AdminSignInProps> = ({ onClose }) => {
  const signInFormRef = useRef<HTMLDivElement>(null);

  const closeSignInForm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (signInFormRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={signInFormRef}
      onClick={closeSignInForm}
      className="z-20 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center"
    >
      <div className="mt-20 flex flex-col gap-5">
        <button
          onClick={onClose}
          className="place-self-end hover:font-extrabold hover:scale-110"
        >
          <AiOutlineClose size={30} style={{ color: "#000000" }} />
        </button>
        <div className="bg-white px-16 py-10 rounded-3xl drop-shadow-2xl flex flex-col items-center">
          <img
            src={woxsenlogo}
            alt="woxsenlogo"
            className="w-48"
          />
          <form className="">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="font-workSans text-md font-semibold text-black opacity-80"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@woxsen.edu.in"
                required
                className="w-full px-4 py-3 bg-[#e8e2e2] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="password"
                className="font-workSans text-md font-semibold text-black opacity-80"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="******"
                required
                className="w-full px-4 py-3 bg-[#e8e2e2] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </form>
          <button className="bg-primary text-white font-semibold w-1/2 py-3 rounded-2xl hover:bg-[#e6243b] hover:scale-105 duration-200">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
