import React from "react";

const CroncertLogo = () => {
  return (
    <div className="croncert-logo-container">
      <a href={`${window.location.protocol}//${window.location.host}`}>
        <svg
          width="150"
          height="80"
          viewBox="0 0 150 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <path
            d="M71 21.5C66.5 15 59 6 42 6C25 6 6.5 16.0001 6.5 51.5C6.5 87 29.5 97.5 42 97.5C54.5 97.5 85 97.5 94.5 97.5C123 97.5 135.5 86.5 133 64.5C130.5 42.5 94.5 23.5 66.5 55"
            stroke="url(#linear)"
            strokeWidth="13"
            strokeLinecap="square"
          />
        </svg>
      </a>
    </div>
  );
};

export default CroncertLogo;
