import { useState } from "react";
import { setLocalStorageData } from "../utils/local-storage";
import { useAuth } from "../contexts/AuthContext";

const useGoogleLogin = () => {
  const url = "http://localhost:4004/api/v1/auth/continueWithGoogle";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const fetchGoogleLoginResponse = async (response) => {
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${response.credential}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        if (data?.user) {
          setLocalStorageData("user", data?.user);
          setUser(data?.user);
          //window.location.reload();
        }
        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { fetchGoogleLoginResponse, isLoading, error };
};

export default useGoogleLogin;
