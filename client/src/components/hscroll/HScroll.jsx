import React from "react";
import styled from "styled-components";

const ScrollBox = styled.div`
  width: 100vw;
  white-space: nowrap;
  display: float;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const HScroll = ({ children }) => {
  return <ScrollBox>{children}</ScrollBox>;
};
