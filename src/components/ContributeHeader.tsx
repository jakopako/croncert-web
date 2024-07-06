import React, { useState } from "react";

const ContributeHeader = () => {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen) {
    return (
      <div className="contribute__header">
        <div className="contribute__link">
          <a href="/contribute">Contribute</a>
        </div>
        <div className="contribute__close">
          <button
            onClick={function (event) {
              setIsOpen(false);
            }}
          >
            x
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ContributeHeader;
