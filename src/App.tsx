import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import ConcertList from "./components/ConcertList";
import { Concert } from "./model";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import Filter from "./components/Filter";
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Contribute from "./components/Contribute";
import CroncertLogo from "./components/CroncertLogo";

type State = {
  baseUrl: string;
  page: number;
  totalPages: number;
  concerts: Array<Concert>;
  titleSearchTerm: string;
  citySearchTerm: string;
  allCities: string[];
  calendarIsOpen: boolean;
  filterIsOpen: boolean;
  date: Date | undefined;
  radius: number;
};

const toISOStringWithTimezone = (date: Date): string => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
};

const baseUrlFromEnv: string = process.env.REACT_APP_CONCERT_API_URL || "";

function SearchPage() {
  const [baseUrl, setBaseUrl] = useState(baseUrlFromEnv);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [concerts, setConcerts] = useState([]);
  const [titleSearchTerm, setTitleSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [radius, setRadius] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const getConcerts = async (
    pageVar: number,
    titleVar: string,
    cityVar: string,
    radiusVar: number,
    dateVar: Date | undefined
  ) => {
    var url =
      baseUrl +
      "?page=" +
      pageVar +
      "&title=" +
      titleVar +
      "&city=" +
      cityVar +
      "&radius=" +
      radiusVar;
    if (dateVar) {
      url += "&date=" + encodeURIComponent(toISOStringWithTimezone(dateVar));
    }

    const res = await fetch(url);
    const res_json = await res.json();
    // only update state if data still relevant
    console.log(pageVar, titleVar, cityVar, radiusVar, dateVar);
    console.log(page, titleSearchTerm, citySearchTerm, radius, date);
    if (
      pageVar === page &&
      titleVar === titleSearchTerm &&
      cityVar === citySearchTerm &&
      radiusVar === radius &&
      dateVar === date
    ) {
      setTotalPages(res_json["last_page"]);
      setConcerts(res_json["data"]);
    }
  };

  const getCities = async () => {
    const url = baseUrl + "/city";
    const res = await fetch(url);
    const res_json = await res.json();
    setAllCities(res_json["data"]);
  };

  useEffect(() => {
    // getConcerts(page, titleSearchTerm, citySearchTerm, radius, date);
    const controller = new AbortController();
    (async () => {
      var url =
        baseUrl +
        "?page=" +
        page +
        "&title=" +
        titleSearchTerm +
        "&city=" +
        citySearchTerm +
        "&radius=" +
        radius;
      if (date) {
        url += "&date=" + encodeURIComponent(toISOStringWithTimezone(date));
      }

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!controller.signal.aborted) {
          if (res.ok) {
            const res_json = await res.json();
            setTotalPages(res_json["last_page"]);
            setConcerts(res_json["data"]);
          }
        }
      } catch (error) {
        //
      }
      // only update state if data still relevant
      // console.log(pageVar, titleVar, cityVar, radiusVar, dateVar);
      // console.log(page, titleSearchTerm, citySearchTerm, radius, date);
      // if (
      //   pageVar === page &&
      //   titleVar === titleSearchTerm &&
      //   cityVar === citySearchTerm &&
      //   radiusVar === radius &&
      //   dateVar === date
      // ) {
      // }
    })();
    setSearchParams({
      title: titleSearchTerm,
      city: citySearchTerm,
      radius: radius.toString(),
      page: page.toString(),
    });
    if (date) {
      setSearchParams({
        title: titleSearchTerm,
        city: citySearchTerm,
        radius: radius.toString(),
        page: page.toString(),
        date: encodeURIComponent(toISOStringWithTimezone(date)),
      });
    }
    console.log("fired");
    return () => {
      controller.abort();
    };
    // }, [titleSearchTerm]);
  }, [titleSearchTerm, citySearchTerm, date, radius, page]);

  useEffect(() => {
    getCities();
    const titleParam = searchParams.get("title");
    if (titleParam) {
      setTitleSearchTerm(titleParam);
    }
    const cityParam = searchParams.get("city");
    if (cityParam) {
      setCitySearchTerm(cityParam);
    }
    const radiusParam = searchParams.get("radius");
    if (radiusParam) {
      setRadius(Number(radiusParam));
    }
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, []);

  function handlePageClick(event: { selected: number }) {
    setPage(event.selected + 1);
    window.scrollTo(0, 0);
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPage(1);
    setFilterIsOpen(false);
  }

  function handleTitleChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTitleSearchTerm(event.currentTarget.titlesearch.value);
    setPage(1);
  }

  function handleCitySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCitySearchTerm(event.currentTarget.citysearch.value);
    setPage(1);
  }

  function triggerCitySubmit(s: string) {
    setCitySearchTerm(s);
    setPage(1);
  }

  function handleDateChange(date: Date) {
    setPage(1);
    setCalendarIsOpen(false);
    setDate(date);
  }

  function handleRadiusChange(event: ChangeEvent<HTMLInputElement>) {
    setPage(1);
    setRadius(event.currentTarget.valueAsNumber);
  }

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    <div>
      <div className="App">
        <CroncertLogo />

        <span className="subtitle">Find upcoming concerts near you.</span>
        <SearchBar
          setCalendarIsOpen={setCalendarIsOpen}
          handleTitleChange={handleTitleChange}
          onCitySubmit={handleCitySubmit}
          triggerCitySubmit={triggerCitySubmit}
          filterIsOpen={filterIsOpen}
          setFilterIsOpen={setFilterIsOpen}
          citySuggestions={allCities}
        />
        <Filter
          date={date}
          handleDateChange={handleDateChange}
          setCalendarIsOpen={setCalendarIsOpen}
          filterIsOpen={filterIsOpen}
          calendarIsOpen={calendarIsOpen}
          radius={radius}
          handleRadiusChange={handleRadiusChange}
          handleApplyFilter={handleSubmit}
        />
        <Calendar
          isOpen={calendarIsOpen}
          date={date}
          handleDateChange={handleDateChange}
        />
        <ConcertList
          concerts={concerts}
          page={page}
          totalPages={totalPages}
          handlePagination={handlePageClick}
        />
        <Footer />
      </div>
    </div>
    //       }
    //     />
    //     <Route path="/contribute" element={<Contribute />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
    </BrowserRouter>
  );
}
