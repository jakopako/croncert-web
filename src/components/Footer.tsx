import React from "react";
import logoWhite from "./github_white.png";
import logoPink from "./github_pink.png";

const Footer = () => {
  return (
    <div className="footer__box">
      <a
        href="https://github.com/jakopako/croncert-web"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={logoWhite}
          alt="Github Logo"
          width="30"
          height="30"
          onMouseOver={(e) => (e.currentTarget.src = logoPink)}
          onMouseOut={(e) => (e.currentTarget.src = logoWhite)}
        />
      </a>
      <div className="contribute__box">
        <a
          href="https://github.com/jakopako/croncert-config"
          target="_blank"
          rel="noreferrer noopener"
        >
          Contribute
        </a>
      </div>
    </div>
  );
};

export default Footer;
