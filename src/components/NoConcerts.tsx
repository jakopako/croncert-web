import React from "react";
import styled from "styled-components";
import {
  NoConcertsLinkColor,
  LinkTextHoverColor,
  TransitionDuration,
} from "./Constants";

const NoConcertsContainer = styled.div`
  padding: 20px;

  a {
    text-decoration: none;
    color: ${NoConcertsLinkColor};
    font-weight: 300;

    &:hover {
      color: ${LinkTextHoverColor};
      transition: ${TransitionDuration};
    }
  }

  button {
    text-decoration: none;
    color: ${NoConcertsLinkColor};
    font-weight: 300;
    font-family: inherit;
    font-size: 16px;
    border: none;
    padding: 0;
    background-color: rgba(255, 255, 255, 0);

    &:hover {
      color: ${LinkTextHoverColor};
      transition: ${TransitionDuration};
      cursor: pointer;
    }
  }
`;

interface Props {
  setNotificationIsOpen: (value: boolean) => void;
}

export const NoConcerts = ({ setNotificationIsOpen }: Props) => {
  return (
    <NoConcertsContainer>
      No concerts found. Want to <a href="/contribute">contribute</a>? Or set up
      a{" "}
      <button
        onClick={function (event) {
          setNotificationIsOpen(true);
        }}
      >
        notification
      </button>
      ?
    </NoConcertsContainer>
  );
};
