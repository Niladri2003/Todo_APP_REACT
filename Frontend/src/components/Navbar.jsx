import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { logout } from "../services/operations/authApi";
import { SignOutButton,useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const {isSignedIn}=useAuth()

  // console.log(token);
  // console.log(process.env.REACT_APP_BASE_URL);
  return (
    <div className="flex items-center h-14 justify-center shadow-md">
      <div className="flex w-11/12 items-center ">
        <Link to={"/"} className="justify-start">
          <img src={Logo} alt="Logo" loading="lazy" />
        </Link>

        <nav className="flex flex-row gap-2 w-full justify-end mr-2 ">
          <Link to="/" className="text-white font-Nunito font-[900]">
            {isSignedIn=== false && <p className="bg-[#8ba5fa] hover:bg-[#7390f2] tracking-[2.6px] p-2 rounded-md">
            Home
              
            </p>}
          </Link>
          {isSignedIn === false ? (
            <Link to="login" className="text-white font-Nunito font-[900]">
              <p className="bg-[#8ba5fa] hover:bg-[#7390f2] p-2 rounded-md tracking-[2.6px]">
                {" "}
                Login
              </p>
            </Link>
          ) : (
            <Link to="/" className="text-white font-Nunito font-[900]">
              <div>
                <SignOutButton>
                  <div  className="bg-[#8ba5fa] hover:bg-[#7390f2] p-2 rounded-md tracking-[2.6px]">
                    Log Out
                  </div>
                </SignOutButton>

              </div>
            </Link>
          )}
          {isSignedIn !== false && <Profile />}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
