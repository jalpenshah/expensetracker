import React from "react";
import { Box } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { Header } from "..";
import { Login } from "../../views";

export const Container = ({ children }) => {
  const { user } = useAuth();

  if (Object.keys(user).length === 0) return <Login />;
  return (
    <Box maxW="md" minH="100vh" padding={4} margin={"auto"}>
      <Header />
      {children}
    </Box>
  );
};
