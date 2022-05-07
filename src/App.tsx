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
      url += "&date=" + this.state.date.toISOString();
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
        // TODO: make sure the time zone is the local timezone.
        dateSearchTerm: date.toISOString(),
        page: 1,
        calendarIsOpen: false,
        date: date,
        dateSelected: true,
      },
      () => {
        console.log(date.toISOString());
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
        <div
          style={{
            backgroundImage: "linear-gradient(#578672,  #7eacb3)",
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        ></div>
        <svg
          style={{
            position: "fixed",
            opacity: 0.6,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <div className="App">
          <span className="heading">CrONCERT</span>
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
