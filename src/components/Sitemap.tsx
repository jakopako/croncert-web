import { useEffect, useState } from "react";

interface Props {
  baseUrlFromEnv: string;
}

const Sitemap = ({ baseUrlFromEnv }: Props) => {
  const [baseUrl] = useState(baseUrlFromEnv);
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    (async () => {
      const url = baseUrl + "/city";
      const res = await fetch(url);
      const res_json = await res.json();
      setAllCities(res_json["data"]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>"list\nof\nitems"</div>;
};

export default Sitemap;
