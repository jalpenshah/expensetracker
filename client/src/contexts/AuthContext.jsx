import React, { useEffect, createContext, useContext, useState } from "react";
import {
  fetchLocalStorageData,
  removeLocalStorageData,
} from "../utils/local-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedUser = fetchLocalStorageData("user");
    if (loggedUser && loggedUser.email) {
      setUser(
        typeof loggedUser === "string" ? JSON.parse(loggedUser) : loggedUser
      );
    }
  }, []);

  const doLogout = () => {
    removeLocalStorageData("user");
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        doLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("The `useAuth` is accesible only under AuthProvider");
  }
  return context;
};
