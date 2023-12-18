import React from "react";
import BackgroundComponent from "./background";
import SignInComponent from "./sign-in";

const AuthComponent = () => {
  return (
    <BackgroundComponent>
      <SignInComponent></SignInComponent>
    </BackgroundComponent>
  );
};

export default AuthComponent;
