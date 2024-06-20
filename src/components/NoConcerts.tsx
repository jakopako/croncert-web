import React from "react";

interface Props {
  setNotificationIsOpen: (value: boolean) => void;
}

export const NoConcerts = ({ setNotificationIsOpen }: Props) => {
  return (
    <div className="noconcerts">
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
    </div>
  );
};
