import React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { RouterProvider, Container } from "./layouts";
import { colors } from "./config/theme";
import { AppProvider } from "./contexts/AppContext";

const Application = () => {
  const theme = extendTheme({ colors });

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppProvider>
          <Container>
            <RouterProvider />
          </Container>
        </AppProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default Application;
