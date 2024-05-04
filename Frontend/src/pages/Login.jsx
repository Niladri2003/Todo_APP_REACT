import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {SignIn} from "@clerk/clerk-react";
import {useAuth} from "@clerk/clerk-react";
import {logindispatcher} from "../services/operations/authApi";

function Login() {

  return (
  <div className="bg-white  justify-center mt-4 mx-auto flex w-11/12">
  <SignIn
      path="/login"
      routing="path"
      SignUpUrl="/signup"

      appearance={{
        elements: {
          card: "bg-foreground",
          formButtonPrimary: "bg-primary rounded-md",
          footerActionLink: "text-primary",
          formFieldInput__identifier: "rounded-md bg-background border-muted",
        },
      }}
    />
  </div>

  );
}

export default Login;
