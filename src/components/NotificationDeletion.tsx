import React, { useEffect, useState } from "react";
import CroncertLogo from "./CroncertLogo";
import { useSearchParams } from "react-router-dom";

interface Props {
  baseUrlFromEnv: string;
}

const NotificationDeletion = ({ baseUrlFromEnv }: Props) => {
  const [header, setHeader] = useState("Unsubscribing...");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  useEffect(() => {
    (async () => {
      const url =
        baseUrlFromEnv +
        "/api/notifications/delete" +
        "?email=" +
        encodeURIComponent(email) +
        "&token=" +
        encodeURIComponent(token);
      const res = await fetch(url);
      // const res_json = await res.json();
      if (res.ok) {
        setHeader("Success!");
        setMessage("Successfully unsubscribed.");
      } else {
        setHeader("Error!");
        setMessage("Something went wrong while unsubscribing.");
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

export default NotificationDeletion;
