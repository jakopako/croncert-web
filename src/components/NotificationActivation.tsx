import React, { useEffect, useState } from "react";
import CroncertLogo from "./CroncertLogo";
import { useSearchParams } from "react-router-dom";

interface Props {
  baseUrlFromEnv: string;
}

const NotificationActivation = ({ baseUrlFromEnv }: Props) => {
  const [header, setHeader] = useState("Verifying...");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
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
        setHeader("Success!");
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
    </div>
  );
};

export default NotificationActivation;
