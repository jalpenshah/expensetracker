import React from "react";
import { Center, Box, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Box
      maxW="md"
      width="100%"
      height="100%"
      top="0"
      position="fixed"
      bgColor="white"
    >
      <Center h="100%">
        <Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
        />
      </Center>
    </Box>
  );
};
