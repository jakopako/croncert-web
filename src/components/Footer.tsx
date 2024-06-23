import React from "react";
import logoWhite from "./github_white.png";
import logoBlack from "./github.png";

const Footer = () => {
  return (
    <div className="footer__box">
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
      <div className="contribute__box">
        <a href="/contribute">Contribute</a>
      </div>
    </div>
  );
};

export default Footer;
