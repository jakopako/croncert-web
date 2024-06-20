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
  const [succMsg, setSuccMsg] = useState("");

  const resetNotiForm = () => {
    setIsOpen(false);
    setSubSucc(false);
    setErrMsg("");
    setSuccMsg("");
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
            setSuccMsg(res_json["message"]);
          } else {
            setErrMsg(res_json["message"]);
          }
        }
      } catch (error) {
        // ignore
      }
    })();
  };

  return (
    <div className="notifications-wrapper__container">
      {isOpen && (
        <div className="notifications__container">
          <div className="close-noti-container">
            <button
              onClick={function (event) {
                resetNotiForm();
              }}
            >
              X
            </button>
          </div>
          {!subSucc && (
            <div>
              <form className="noti_form">
                <input
                  autoComplete="off"
                  id="titlenotification"
                  type="input"
                  placeholder="Title"
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
                <input
                  autoComplete="off"
                  id="citynotification"
                  type="input"
                  placeholder="City"
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
                <input
                  autoComplete="off"
                  id="emailnotification"
                  type="input"
                  placeholder="foo@bar.com"
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
                  disabled={
                    !titleNotification ||
                    !cityNotification ||
                    !emailNotification
                  }
                  onClick={function (event) {
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
