import React, { useEffect, useState } from "react";
import CroncertLogo from "./CroncertLogo";
import { useSearchParams } from "react-router-dom";

interface Props {
  baseUrlFromEnv: string;
}

const NotificationActivation = ({ baseUrlFromEnv }: Props) => {
  const [header, setHeader] = useState("Verifying...");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [queryTitle, setQueryTitle] = useState("");
  const [queryCity, setQueryCity] = useState("");
  const [queryRadius, setQueryRadius] = useState("");
  const [queryEmail, setQueryEmail] = useState("");
  useEffect(() => {
    (async () => {
      const url =
        baseUrlFromEnv +
        "/api/notifications/activate" +
        "?email=" +
        encodeURIComponent(email) +
        "&token=" +
        encodeURIComponent(token);
      const res = await fetch(url);
      const res_json = await res.json();
      setMessage(res_json["message"]);
      if (res_json["success"]) {
        setSuccess(true);
        setHeader("Success!");
        setQueryTitle(res_json["data"]["query"]["title"]);
        setQueryCity(res_json["data"]["query"]["city"]);
        setQueryRadius(res_json["data"]["query"]["radius"]);
        setQueryEmail(res_json["data"]["email"]);
      } else {
        setHeader("Error!");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <CroncertLogo />
      <h2>{header}</h2>
      <p>{message}</p>
      {success && queryTitle !== "" && (
        <div>
          <p>
            <b>Title:</b> {queryTitle}
          </p>
          <p>
            <b>City:</b> {queryCity}
          </p>
          <p>
            <b>Radius:</b> {queryRadius} km
          </p>
          <p>
            <b>Email:</b> {queryEmail}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationActivation;
