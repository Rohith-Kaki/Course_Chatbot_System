import React, { useRef, useState } from "react";
// import woxsenlogo from "../../Assests/WoxsenLogo/woxsenlogo1.svg";
import woxsenlogo from "../../Assests/logo/woxsenlogo.webp"
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface AdminSignInProps {
  onClose: () => void;
}

const AdminSignIn: React.FC<AdminSignInProps> = ({ onClose }) => {
  const signInFormRef = useRef<HTMLDivElement>(null);
  const navigate =  useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const VALID_EMAIL = "admin@woxsen.edu.in";
  const VALID_PASSWORD = "admin123";

  const closeSignInForm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (signInFormRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if(email === VALID_EMAIL && password === VALID_PASSWORD){
      navigate("/Admin");
      onClose();
    }else{
      setError("Invalid email or password. Please try again.");
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
          <form onSubmit={handleSubmit} className="w-full">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                required
                className="w-full px-4 py-3 bg-[#e8e2e2] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <button type="submit" className="bg-primary text-white font-semibold w-1/2 py-3 rounded-2xl hover:bg-[#e6243b] hover:scale-105 duration-200 mx-auto block">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
