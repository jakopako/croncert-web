import React, { Component } from "react";
import "./App.css";
import ConcertList from "./components/ConcertList";
import { Concert } from "./model";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    totalPages: 0,
    page: 1,
    concerts: [],
    titleSearchTerm: "",
    citySearchTerm: "",
    allCities: [],
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

  async getCities() {
    const url = this.state.baseUrl + "/city";
    const res = await fetch(url);
    const res_json = await res.json();
    this.setState({
      allCities: res_json["data"],
    });
  }

  async componentDidMount() {
    this.getConcerts();
    this.getCities();
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

  handleCitySubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  triggerCitySubmit = (s: string) => {
    this.setState(
      {
        citySearchTerm: s,
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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="App">
                  <CroncertLogo />

                  <span className="subtitle">
                    Find upcoming concerts near you.
                  </span>
                  <SearchBar
                    handleTitleChange={this.handleTitleChange}
                    onCitySubmit={this.handleCitySubmit}
                    triggerCitySubmit={this.triggerCitySubmit}
                    calendarIsOpen={this.state.calendarIsOpen}
                    setCalendarIsOpen={this.setCalendarIsOpen}
                    citySuggestions={this.state.allCities}
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
            }
          />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
