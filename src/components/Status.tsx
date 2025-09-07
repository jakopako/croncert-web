import React, { useState } from "react";
import CroncertLogo from "./CroncertLogo";

interface Props {
  baseUrlFromEnv: string;
}

const Status = ({ baseUrlFromEnv }: Props) => {
  const [loading, setLoading] = useState(true);
  const [baseUrlStatus] = useState(baseUrlFromEnv + "/api/status");
  const [status, setStatus] = useState([]);

  return (
    <div className="App">
      <CroncertLogo />
      <h2>Scraper Status</h2>
      <p>The service is currently up and running!</p>
      <p>For any issues, please contact support.</p>
    </div>
  );
};

export default Status;
