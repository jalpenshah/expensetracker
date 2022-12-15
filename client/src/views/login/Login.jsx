import React, { useEffect } from "react";
import useGoogleLogin from "../../hooks/useGoogleLogin";

export const Login = () => {
  const { fetchGoogleLoginResponse, isLoading, error } = useGoogleLogin();

  useEffect(() => {
    if (window.google) {
      /* global google */
      google.accounts.id.initialize({
        client_id:
          "226138449041-ulsgtq3egdkjhok8onmbhd1hmmmbab4a.apps.googleusercontent.com",
        callback: fetchGoogleLoginResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("continue-with-google"),
        {
          width: "250",
          type: "standard",
          theme: "filled_black",
          text: "continue_with",
          shape: "circle",
        }
      );
    }
  }, [fetchGoogleLoginResponse]);

  return (
    <>
      <div>Login</div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div id="continue-with-google" data-text="continue-with-google"></div>
        </>
      )}
    </>
  );
};
