import React from "react";

const CroncertLogo = () => {
  return (
    <div className="croncert-logo-container">
      <a href="https://croncert.ch">
        <svg
          width="70"
          height="90"
          viewBox="0 0 91 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FF03E1" />
              <stop offset="100%" stop-color="#1F14FF" />
            </linearGradient>
          </defs>
          <path
            d="M69 24C61.5 11.5 52 6.5 39 6.5C26 6.5 6 19 6 54.5C6 90 26.5 103.5 39 103.5C51.5 103.5 58.5 98.5 69 88.5M69 88.5C77.5 80.4047 79.5 73.4999 79.5 66.4999C79.5 59.4999 76.4999 50.9999 69 50.9999C61.5 50.9999 57.5 58.4999 57.5 66.4999C57.5 74.4999 61.5 80.5 69 88.5ZM69 88.5L82.5 103.5"
            stroke="url(#linear)"
            stroke-width="12"
            stroke-linecap="square"
          />
        </svg>
      </a>
    </div>
  );
};

export default CroncertLogo;
