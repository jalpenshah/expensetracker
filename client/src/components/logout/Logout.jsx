import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
  const { doLogout } = useAuth();
  return (
    <button
      onClick={doLogout}
      style={{
        color: "red",
        border: "1px solid gray",
        backgroundColor: "white",
        padding: "0.5rem 1rem",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};
