import React, { Component } from "react";
import "./App.css";
import ConcertList from "./components/ConcertList";
import { Concert } from "./model";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import ReactGA from "react-ga";
import Calendar from "./components/Calendar";

ReactGA.initialize("UA-225379065-1");

type State = {
  baseUrl: string;
  page: number;
  totalPages: number;
  concerts: Array<Concert>;
  titleSearchTerm: string;
  citySearchTerm: string;
  calendarIsOpen: boolean;
  date: Date;
  dateSelected: boolean;
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

class App extends Component {
  state: State = {
    baseUrl: "https://api.croncert.ch/api/events",
    // baseUrl: "http://localhost:5000/api/events",
    totalPages: 0,
    page: 1,
    concerts: [],
    titleSearchTerm: "",
    citySearchTerm: "",
    calendarIsOpen: false,
    date: new Date(),
    dateSelected: false,
  };

  async getConcerts() {
    var url =
      this.state.baseUrl +
      "?page=" +
      this.state.page +
      "&title=" +
      this.state.titleSearchTerm +
      "&city=" +
      this.state.citySearchTerm;
    if (this.state.dateSelected) {
      url +=
        "&date=" + encodeURIComponent(toISOStringWithTimezone(this.state.date));
    }
    const res = await fetch(url);
    const res_json = await res.json();
    this.setState({
      totalPages: res_json["last_page"],
      page: res_json["page"],
      concerts: res_json["data"],
    });
  }

  async componentDidMount() {
    ReactGA.pageview(window.location.pathname);
    this.getConcerts();
  }

  handlePageClick = (event: { selected: number }) => {
    this.setState({ page: event.selected + 1 }, () => {
      this.getConcerts();
    });
    window.scrollTo(0, 0);
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(
      {
        titleSearchTerm: event.currentTarget.titlesearch.value,
        citySearchTerm: event.currentTarget.citysearch.value,
        page: 1,
      },
      () => {
        this.getConcerts();
      }
    );
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(
      {
        page: 1,
      },
      () => {
        this.getConcerts();
      }
    );
  };

  handleTitleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(
      {
        titleSearchTerm: event.currentTarget.titlesearch.value,
        page: 1,
      },
      () => {
        this.getConcerts();
      }
    );
  };

  handleCityChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(
      {
        citySearchTerm: event.currentTarget.citysearch.value,
        page: 1,
      },
      () => {
        this.getConcerts();
      }
    );
  };

  handleDateChange = (date: Date) => {
    this.setState(
      {
        page: 1,
        calendarIsOpen: false,
        date: date,
        dateSelected: true,
      },
      () => {
        console.log(toISOStringWithTimezone(date));
        this.getConcerts();
      }
    );
  };

  setCalendarIsOpen = (value: boolean) => {
    this.setState({
      calendarIsOpen: value,
    });
  };

  render() {
    return (
      <div>
        <div className="App">
          {/* <span className="heading">CrONCERT</span> */}
          <div className="croncert-logo-container">
            <a href="https://croncert.ch">
              <svg
                width="70"
                height="90"
                viewBox="0 0 91 112"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF03E1" />
                    <stop offset="100%" stop-color="#1F14FF" />
                  </linearGradient>
                </defs>
                <path
                  d="M69 24C61.5 11.5 52 6.5 39 6.5C26 6.5 6 19 6 54.5C6 90 26.5 103.5 39 103.5C51.5 103.5 58.5 98.5 69 88.5M69 88.5C77.5 80.4047 79.5 73.4999 79.5 66.4999C79.5 59.4999 76.4999 50.9999 69 50.9999C61.5 50.9999 57.5 58.4999 57.5 66.4999C57.5 74.4999 61.5 80.5 69 88.5ZM69 88.5L82.5 103.5"
                  stroke="url(#linear)"
                  stroke-width="12"
                  stroke-linecap="square"
                />
              </svg>
            </a>
          </div>

          <span className="subtitle">Find upcoming concerts near you.</span>
          <SearchBar
            handleTitleChange={this.handleTitleChange}
            handleCityChange={this.handleCityChange}
            calendarIsOpen={this.state.calendarIsOpen}
            setCalendarIsOpen={this.setCalendarIsOpen}
          />
          <Calendar
            isOpen={this.state.calendarIsOpen}
            date={this.state.date}
            handleDateChange={this.handleDateChange}
          />
          <ConcertList
            concerts={this.state.concerts}
            page={this.state.page}
            totalPages={this.state.totalPages}
            handlePagination={this.handlePageClick}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
