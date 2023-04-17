import React, { ChangeEvent, Component } from "react";
import "./App.css";
import ConcertList from "./components/ConcertList";
import { Concert } from "./model";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import Filter from "./components/Filter";
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

class App extends Component {
  state: State = {
    baseUrl: baseUrlFromEnv,
    totalPages: 0,
    page: 1,
    concerts: [],
    titleSearchTerm: "",
    citySearchTerm: "",
    allCities: [],
    calendarIsOpen: false,
    filterIsOpen: false,
    date: undefined,
    radius: 0,
  };

  async getConcerts() {
    var url =
      this.state.baseUrl +
      "?page=" +
      this.state.page +
      "&title=" +
      this.state.titleSearchTerm +
      "&city=" +
      this.state.citySearchTerm +
      "&radius=" +
      this.state.radius;
    if (this.state.date) {
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

  handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState(
      {
        page: 1,
        filterIsOpen: false,
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
      }
      // () => {
      //   console.log(toISOStringWithTimezone(date));
      //   this.getConcerts();
      // }
    );
  };

  handleRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      page: 1,
      radius: event.currentTarget.valueAsNumber,
    });
  };

  setCalendarIsOpen = (value: boolean) => {
    this.setState({
      calendarIsOpen: value,
    });
    console.log(this.state.calendarIsOpen);
  };

  setFilterIsOpen = (value: boolean) => {
    this.setState({
      filterIsOpen: value,
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
                    setCalendarIsOpen={this.setCalendarIsOpen}
                    handleTitleChange={this.handleTitleChange}
                    onCitySubmit={this.handleCitySubmit}
                    triggerCitySubmit={this.triggerCitySubmit}
                    filterIsOpen={this.state.filterIsOpen}
                    setFilterIsOpen={this.setFilterIsOpen}
                    citySuggestions={this.state.allCities}
                  />
                  <Filter
                    date={this.state.date}
                    handleDateChange={this.handleDateChange}
                    setCalendarIsOpen={this.setCalendarIsOpen}
                    filterIsOpen={this.state.filterIsOpen}
                    calendarIsOpen={this.state.calendarIsOpen}
                    radius={this.state.radius}
                    handleRadiusChange={this.handleRadiusChange}
                    handleApplyFilter={this.handleSubmit}
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
