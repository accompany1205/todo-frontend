import React, { useState, createContext, ReactNode, useEffect } from "react";
import AxiosInstance from "../utils/axios";
import jwtService from "../services/jwtService.js";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthnticated] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    jwtService.on("onAutoLogin", (value) => {
      setIsAuthnticated(value);
    });
    // jwtService.on('userInfo', (value) => {
    //   setUser(value)
    //   dispatch(updateProfile(value.userProfile))
    // })
    jwtService.on("onAutoLogout", () => {
      setIsAuthnticated(false);
    });

    jwtService.handleAuthentication();

    return () => {
      jwtService.removeListener("onAutoLogin");
      jwtService.removeListener("onAutoLogout");
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const res = await jwtService.signInWithEmailAndPassword(email, password);
      if (res) {
        setIsAuthnticated(true);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  const signUp = async (email, password, name) => {
    try {
      const res = await AxiosInstance.post("/auth/register", {
        email,
        password,
        name,
      });
      console.log(res);
      if (res && res.status === 201) {
        await signIn(email, password);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  const logOut = () => {
    jwtService.logout();
    setIsAuthnticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthnticated,
        signIn,
        signUp,
        logOut,
        modalShow,
        setModalShow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
