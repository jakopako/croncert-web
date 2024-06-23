import React, { useEffect, useState } from "react";
import CroncertLogo from "./CroncertLogo";

interface Props {
  baseUrlFromEnv: string;
}

const Contribute = ({ baseUrlFromEnv }: Props) => {
  const [nrVenues, setNrVenues] = useState(0);
  useEffect(() => {
    (async () => {
      const url = baseUrlFromEnv + "/api/events/location";
      const res = await fetch(url);
      const res_json = await res.json();
      setNrVenues(res_json["data"].length);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <CroncertLogo />
      <h2>Website idea</h2>
      <p>
        The ultimate goal of this website is to provide an easy way of finding
        concerts in any city around the world. Of course there are tons of
        websites that do just this but those websites mainly seem to focus on
        bigger concert locations. Hence the focus of this project lies in
        collecting and providing data from smaller, less known concert
        locations.
      </p>
      <h2>How does it work?</h2>
      <p>
        There are four projects involved in making this website work. The first
        one is of course the frontend which is a simple react app. You can find
        the source code{" "}
        <a href="https://github.com/jakopako/croncert-web">here.</a>
      </p>
      <p>
        The second part is the backend which consists of a simple API that
        provides the actual concert data. The source code can be found{" "}
        <a href="https://github.com/jakopako/event-api">here</a> and the swagger
        documentation can be found{" "}
        <a href="https://api.croncert.ch/api/swagger/index.html#/">here.</a>{" "}
        Note that the endpoints for fetching the data are publicly available for
        anyone to use.
      </p>
      <p>
        The third part is the github repository that contains the configuration
        for the scraper that actually fetches the concert data from various
        websites. The repository can be found{" "}
        <a href="https://github.com/jakopako/croncert-config">here.</a>{" "}
        Additionally, this repository has a github action that runs the scraper
        regularely.
      </p>
      <p>
        Last but not least the scraper itself, the center piece of this project,
        can be found <a href="https://github.com/jakopako/goskyr">here.</a>
      </p>
      <h2>How to contribute</h2>
      <p>
        As you've seen there are a bunch of different parts to this project. If
        you like this website idea and want to contribute there are many
        different options for you.
      </p>
      <p>
        First of all, I'm not a frontend guy (might be obvious 😅). So if you
        want to make a better, more beautiful looking website please do so! Or
        just improve this one. Then there's of course the dataset itself. Right
        now there are {nrVenues} different concert venues that are being scraped
        regularely and those venues are mostly located in Europe. If you know
        cool, small venues in your area it'd be huge if you opened a pull
        request in the repository that holds the{" "}
        <a href="https://github.com/jakopako/croncert-config">
          scraper configuration.
        </a>{" "}
        Even just opening a new issue with the link to the new venue's website
        would be a nice contribution. Finally, in all of the different parts of
        this project there are things that can be improved and bugs that need
        fixing. So if you want to contribute in any way feel free to browse the
        repositories, play around with the code, open issues & open pull
        requests!
      </p>
      <br></br>
      Cheers, Jakob
      <p></p>
    </div>
  );
};

export default Contribute;
