import React, { useState } from "react";
import logo from "../Assests/logo/woxsn_logo.png"
import SchoolSelectionPopUp from "../components/PopUpModels/SchoolSelectionPopUp"
import SignIn from "../components/PopUpModels/SignInPopUp"

const Header: React.FC = () => {
    const [schoolPopUp, setSchoolPopUp] = useState(false);
    const [signInPopUp, setSignInPopUp] = useState(false);
    return(
        <>
        <header className="sticky top-0 z-10 w-full py-8 px-20 mb-8 bg-white bg-opacity-30 backdrop-blur-lg    ">
            <div className="flex justify-between">
                <div>
                    <img className="w-40" src={logo} alt="logo"/>
                </div>
                <nav className="flex gap-24 items-center ">
                    <a onClick={() => setSchoolPopUp(true)} className="text-black font-workSans font-semibold cursor-pointer hover:scale-110 duration-200">Schools</a>
                    <a onClick={() => setSignInPopUp(true)} className="text-black font-workSans font-semibold cursor-pointer hover:scale-110 duration-200">SignIn</a>
                </nav>
            </div>
        </header>
        {schoolPopUp && <SchoolSelectionPopUp onClose={() => setSchoolPopUp(false)}/>}
        {signInPopUp && <SignIn onClose={() => setSignInPopUp(false)}/>}
        </>
    )
};
export default Header;

