import React, { Component } from "react";
import "./App.css";
import ConcertList from "./components/ConcertList";
import { Concert } from "./model";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import ReactGA from "react-ga";

ReactGA.initialize("G-1VDTNKYJRK");

type State = {
  baseUrl: string;
  page: number;
  totalPages: number;
  concerts: Array<Concert>;
  titleSearchTerm: string;
  citySearchTerm: string;
};

class App extends Component {
  state: State = {
    baseUrl: "https://api.croncert.ch/api/events",
    totalPages: 0,
    page: 1,
    concerts: [],
    titleSearchTerm: "",
    citySearchTerm: "",
  };

  async getConcerts() {
    const res = await fetch(
      this.state.baseUrl +
        "?page=" +
        this.state.page +
        "&title=" +
        this.state.titleSearchTerm +
        "&city=" +
        this.state.citySearchTerm
    );
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
    this.setState({
      titleSearchTerm: event.currentTarget.titlesearch.value,
    });
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
          <SearchBar
            handleSubmit={this.handleSubmit}
            handleTitleChange={this.handleTitleChange}
            handleCityChange={this.handleCityChange}
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
