import React, { useState } from "react";
import styled from "styled-components";
import {
  ContributeHeaderBackgroundColor,
  TextColor,
  LinkTextHoverColor,
  TransitionDuration,
} from "./Constants";

const ContributeHeaderWrapper = styled.div`
  padding: 10px 0 10px 0;
  height: 20px;
  width: 100%;
  background-color: ${ContributeHeaderBackgroundColor};
  text-align: center;
  flex-direction: column;
`;

const ContributeLink = styled.div`
  z-index: 10;
  position: relative;

  a {
    color: ${TextColor};
    text-decoration: none;
    font-weight: 400;
    transition: ${TransitionDuration};

    &:hover {
      color: ${LinkTextHoverColor};
    }
  }
`;

const ContributeClose = styled.div`
  margin-top: -18px;
  font-size: 16px;
  position: absolute;
  width: 100%;

  button {
    z-index: 20;
    position: relative;
    margin-right: 5px;
    float: right;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-family: inherit;
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ContributeHeader = () => {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen) {
    return (
      <ContributeHeaderWrapper>
        <ContributeLink>
          <a href="/contribute">Contribute</a>
        </ContributeLink>
        <ContributeClose>
          <button
            onClick={function (event) {
              setIsOpen(false);
            }}
          >
            x
          </button>
        </ContributeClose>
      </ContributeHeaderWrapper>
    );
  } else {
    return <div></div>;
  }
};

export default ContributeHeader;
