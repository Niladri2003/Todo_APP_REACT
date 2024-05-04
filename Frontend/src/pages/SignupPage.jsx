import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {SignUp} from "@clerk/clerk-react";




function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-white flex justify-center mt-4">

      <SignUp
      path="/signup"
      redirectUrl={"/"}
      afterSignup="/"
      appearance={{
        elements: {
          card: "bg-foreground",
          formButtonPrimary: "bg-primary rounded-md",
          footerActionLink: "text-primary",
          formFieldInput: "rounded-md bg-background border-muted",
          otpCodeFieldInput: "rounded-md bg-background border-muted",
        },
      }}
        />

    </div>
  );
}

export default SignupPage;
