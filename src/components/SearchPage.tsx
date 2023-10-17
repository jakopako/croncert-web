import React, { ChangeEvent, useEffect, useState } from "react";
import ConcertList from "./ConcertList";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Calendar from "./Calendar";
import Filter from "./Filter";
import { useSearchParams } from "react-router-dom";
import CroncertLogo from "./CroncertLogo";

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

const fromISOStringWithtimezone = (dateString: string): Date => {
  console.log(dateString);
  return new Date(dateString);
};

const baseUrlFromEnv: string = process.env.REACT_APP_CONCERT_API_URL || "";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [baseUrl] = useState(baseUrlFromEnv);
  const [totalPages, setTotalPages] = useState(0);
  const [concerts, setConcerts] = useState([]);
  const [titleSearchTerm, setTitleSearchTerm] = useState(
    searchParams.get("title") || ""
  );
  const [citySearchTerm, setCitySearchTerm] = useState(
    searchParams.get("city") || ""
  );
  const radiusParam = searchParams.get("radius");
  let radiusDefault = 0;
  if (radiusParam) radiusDefault = Number(radiusParam);
  const [radius, setRadius] = useState(radiusDefault);
  const pageParam = searchParams.get("page");
  let pageDefault = 1;
  if (pageParam) pageDefault = Number(pageParam);
  const [page, setPage] = useState(pageDefault);
  const dateParam = searchParams.get("date");
  let dateDefault = undefined;
  if (dateParam)
    dateDefault = fromISOStringWithtimezone(decodeURIComponent(dateParam));
  const [date, setDate] = useState<Date | undefined>(dateDefault);
  const [allCities, setAllCities] = useState([]);
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const getCities = async () => {
    const url = baseUrl + "/city";
    const res = await fetch(url);
    const res_json = await res.json();
    setAllCities(res_json["data"]);
  };

  useEffect(() => {
    // fetch new list of concerts
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
        // ignore
      }
    })();

    let newSearchParams = new URLSearchParams();
    if (titleSearchTerm !== "")
      newSearchParams.append("title", titleSearchTerm);
    if (citySearchTerm !== "") newSearchParams.append("city", citySearchTerm);
    if (radius > 0) newSearchParams.append("radius", radius.toString());
    if (page > 1) newSearchParams.append("page", page.toString());
    if (date)
      newSearchParams.append(
        "date",
        encodeURIComponent(toISOStringWithTimezone(date))
      );
    setSearchParams(newSearchParams);
    return () => {
      controller.abort();
    };
  }, [titleSearchTerm, citySearchTerm, date, radius, page]);

  useEffect(() => {
    getCities();
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
          initialTitle={titleSearchTerm}
          initialCity={citySearchTerm}
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
  );
}
