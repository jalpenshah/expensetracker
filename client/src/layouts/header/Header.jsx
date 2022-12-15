import React from "react";
import {
  Square,
  Flex,
  Avatar,
  Image,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo-dark.png";

export const Header = () => {
  const { user } = useAuth();

  return (
    <Flex paddingBottom={6}>
      <Square>
        <IconButton
          variant="ghost"
          aria-label="menu"
          fontSize="40px"
          icon={<HamburgerIcon />}
        />
      </Square>
      <Spacer />
      <Square>
        <Image src={logo} alt="Jalpen Shah" width={14} />
      </Square>
      <Spacer />
      <Square>
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          src={user.picture}
        />
      </Square>
    </Flex>
  );
};
