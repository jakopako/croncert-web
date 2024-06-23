import React, { ChangeEvent, useEffect, useState } from "react";
import ConcertList from "./ConcertList";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Calendar from "./Calendar";
import Filter from "./Filter";
import Notifications from "./Notifications";
import { useSearchParams } from "react-router-dom";
import CroncertLogo from "./CroncertLogo";
import ReactPaginate from "react-paginate";

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
  // console.log(dateString);
  return new Date(dateString);
};

interface Props {
  baseUrlFromEnv: string;
}

const SearchPage = ({ baseUrlFromEnv }: Props) => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [baseUrlEvents] = useState(baseUrlFromEnv + "/api/events");
  const [baseUrlNotifications] = useState(
    baseUrlFromEnv + "/api/notifications"
  );
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

  // notifications
  const [notificationsIsOpen, setNotificationsIsOpen] = useState(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    // fetch new list of concerts
    const start = new Date().getTime();
    const controller = new AbortController();
    (async () => {
      var url =
        baseUrlEvents +
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
      const elapsed = new Date().getTime() - start;
      const toWait = 500 - elapsed;
      if (toWait > 0) await delay(toWait);
      setLoading(false);
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
  }, [
    titleSearchTerm,
    citySearchTerm,
    date,
    radius,
    page,
    baseUrlEvents,
    setSearchParams,
  ]);

  useEffect(() => {
    (async () => {
      const url = baseUrlEvents + "/city";
      const res = await fetch(url);
      const res_json = await res.json();
      setAllCities(res_json["data"]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (citySearchTerm) {
      document.title = "Concerts in " + citySearchTerm;
    }
  }, [citySearchTerm]);

  function handlePageClick(event: { selected: number }) {
    setPage(event.selected + 1);
    window.scrollTo(0, 0);
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
          setNotificationIsOpen={setNotificationsIsOpen}
        />
        <Filter
          date={date}
          handleDateChange={handleDateChange}
          setCalendarIsOpen={setCalendarIsOpen}
          isOpen={filterIsOpen}
          calendarIsOpen={calendarIsOpen}
          radius={radius}
          handleRadiusChange={handleRadiusChange}
        />
        <Calendar
          isOpen={calendarIsOpen}
          date={date}
          handleDateChange={handleDateChange}
        />
        <Notifications
          isOpen={notificationsIsOpen}
          setIsOpen={setNotificationsIsOpen}
          title={titleSearchTerm}
          city={citySearchTerm}
          radius={radius}
          baseUrl={baseUrlNotifications}
        />
        <ConcertList
          loading={loading}
          concerts={concerts}
          // page={page}
          // totalPages={totalPages}
          // handlePagination={handlePageClick}
          setNotificationIsOpen={setNotificationsIsOpen}
        />
        <div className="pagination">
          {concerts && !loading && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={totalPages}
              previousLabel="<"
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
