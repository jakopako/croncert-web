import React, { HTMLAttributeAnchorTarget, useState } from "react";

interface Props {
  isOpen: boolean;
  title: string;
  city: string;
  radius: number;
  baseUrl: string;
}

const Notifications = ({ isOpen, title, city, radius, baseUrl }: Props) => {
  const [titleNotification, setTitleNotification] = useState(title);
  const [cityNotification, setCityNotification] = useState(city);
  const [radiusNotification, setRadiusNotification] = useState(radius);
  const [emailNotification, setEmailNotification] = useState("");

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
          if (res.ok) {
            const res_json = await res.json();
            console.log(res_json);
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
          <form className="noti_form">
            <input
              id="titlenotification"
              type="input"
              placeholder="Title"
              className="noti_input"
              defaultValue={titleNotification}
              onChange={function (event: React.ChangeEvent<HTMLInputElement>) {
                setTitleNotification(event.currentTarget.value);
              }}
            />
          </form>
          <form className="noti_form">
            <input
              id="citynotification"
              type="input"
              placeholder="City"
              className="noti_input"
              defaultValue={cityNotification}
              onChange={function (event: React.ChangeEvent<HTMLInputElement>) {
                setCityNotification(event.currentTarget.value);
              }}
            />
          </form>
          <form className="noti_form">
            <input
              id="emailnotification"
              type="input"
              placeholder="foo@bar.com"
              className="noti_input"
              onChange={function (event: React.ChangeEvent<HTMLInputElement>) {
                setEmailNotification(event.currentTarget.value);
              }}
            />
          </form>
          <form className="noti_form_range">
            <input
              type="range"
              min={0}
              max={200}
              step={10}
              value={radiusNotification}
              className="range-slider"
              onChange={function (event: React.ChangeEvent<HTMLInputElement>) {
                setRadiusNotification(event.currentTarget.valueAsNumber);
              }}
            />
          </form>
          <button
            className="noti_subscribe_button"
            type="submit"
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
      )}
    </div>
  );
};

export default Notifications;
