import React from "react";
import styled from "styled-components";
import logoBlack from "./github.png";
import logoWhite from "./github_white.png";
import { TextColor, LinkTextHoverColor, TransitionDuration } from "./Constants";

const FooterBox = styled.div`
  padding: 20px;
  display: flex;
`;

const FooterComponent = styled.div`
  padding: 10px 0 10px 10px;

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

const Footer = () => {
  return (
    <FooterBox>
      <a
        href="https://github.com/jakopako/croncert-web"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={logoBlack}
          alt="Github Logo"
          width="30"
          height="30"
          onMouseOver={(e) => (e.currentTarget.src = logoWhite)}
          onMouseOut={(e) => (e.currentTarget.src = logoBlack)}
        />
      </a>
      <FooterComponent>
        <a href="/contribute">Contribute</a>
      </FooterComponent>

      <FooterComponent>
        <a href="/status">Status</a>
      </FooterComponent>
    </FooterBox>
  );
};

export default Footer;
