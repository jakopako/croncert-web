import React, { useState } from "react";
import radiusIcon from "./radius.png";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  city: string;
  radius: number;
  baseUrl: string;
}

const Notifications = ({
  isOpen,
  setIsOpen,
  title,
  city,
  radius,
  baseUrl,
}: Props) => {
  const [titleNotification, setTitleNotification] = useState(title);
  const [cityNotification, setCityNotification] = useState(city);
  const [radiusNotification, setRadiusNotification] = useState(radius);
  const [emailNotification, setEmailNotification] = useState("");
  const [subSucc, setSubSucc] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const resetNotiForm = () => {
    setIsOpen(false);
    setSubSucc(false);
    setErrMsg("");
    setTitleNotification(title);
    setCityNotification(city);
    setRadiusNotification(radius);
  };

  const handleNotiSubmit = (
    title: string,
    city: string,
    radius: number,
    email: string
  ) => {
    console.log(title, city, radius, email);
    const controller = new AbortController();
    (async () => {
      var url =
        baseUrl +
        "/add" +
        "?title=" +
        titleNotification +
        "&city=" +
        cityNotification +
        "&radius=" +
        radiusNotification +
        "&email=" +
        emailNotification;

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!controller.signal.aborted) {
          const res_json = await res.json();
          console.log(res_json);
          if (res.ok) {
            setSubSucc(true);
          } else {
            setErrMsg(res_json["message"]);
          }
        }
      } catch (error) {
        // ignore
      }
    })();
  };

  const isSubmitButtonDisabled =
    !titleNotification || !cityNotification || !emailNotification;

  const labelStyle: React.CSSProperties = {
    fontWeight: "bold",
    display: "block",
    textAlign: "left",
    fontSize: "0.95em",
    marginBottom: "2px",
  };

  return (
    <div className="notifications-wrapper__container">
      {isOpen && (
        <div className="notifications__container">
          <div className="close-noti-container">
            <button
              onClick={function (_event) {
                resetNotiForm();
              }}
            >
              x
            </button>
          </div>
          {!subSucc && (
            <div>
              <form className="noti_form">
                <label htmlFor="titlenotification" style={labelStyle}>
                  Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  autoComplete="off"
                  id="titlenotification"
                  type="text"
                  className="noti_input"
                  defaultValue={titleNotification}
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) {
                    setTitleNotification(event.currentTarget.value);
                  }}
                />
              </form>
              <form className="noti_form">
                <label htmlFor="citynotification" style={labelStyle}>
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  autoComplete="off"
                  id="citynotification"
                  type="text"
                  className="noti_input"
                  defaultValue={cityNotification}
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) {
                    setCityNotification(event.currentTarget.value);
                  }}
                />
              </form>
              <form className="noti_form">
                <label htmlFor="emailnotification" style={labelStyle}>
                  Email address <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  autoComplete="off"
                  id="emailnotification"
                  type="email"
                  className="noti_input"
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) {
                    setEmailNotification(event.currentTarget.value);
                  }}
                />
              </form>
              <form className="noti_form">
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={10}
                  value={radiusNotification}
                  className="range-slider"
                  onChange={function (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) {
                    setRadiusNotification(event.currentTarget.valueAsNumber);
                  }}
                />
                <span className="range-slider__value">
                  {radiusNotification} km
                </span>
                <img
                  src={radiusIcon}
                  width="22"
                  height="22"
                  alt="radius icon"
                />
              </form>
              <div className="noti-error-message">{errMsg}</div>
              <div className="noti-button__container">
                <button
                  className="noti-button"
                  type="submit"
                  disabled={isSubmitButtonDisabled}
                  style={
                    isSubmitButtonDisabled
                      ? {
                          backgroundColor: "#eee",
                          color: "#aaa",
                          border: "1px solid #ccc",
                          cursor: "not-allowed",
                          opacity: 0.7,
                        }
                      : {}
                  }
                  onClick={function (_event) {
                    handleNotiSubmit(
                      titleNotification,
                      cityNotification,
                      radiusNotification,
                      emailNotification
                    );
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}

          {subSucc && (
            <div className="noti-success">
              Success! Please check your e-mails.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
