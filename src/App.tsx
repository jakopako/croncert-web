import { Component } from 'react';
import './App.css';
import ConcertList from './components/ConcertList';
import SearchField from './components/SearchField';
import { Concert } from './model';
import { Route, Routes } from "react-router-dom";

type State = {
  baseUrl: string;
  page: number;
  totalPages: number;
  concerts: Array<Concert>;
  titleSearchTerm: string;
}

type Props = {
  history: History;
  location: Location;
};

class App extends Component {
  // const concerts = [
  //   {
  //     title: "Jugendblasorchester Zürich (JBOZ)",
  //     location: 'Tonhalle',
  //     city: 'Zurich',
  //     comment: 'Jugendblasorchester Zürich JBOZ',
  //     url: 'https://www.tonhalle-orchester.ch/en/concerts/kalender/jugendblasorchester-zrich-jboz-1439709/tz/',
  //     date: new Date()
  //   },
  //   {
  //     title: "MEDHANE",
  //     location: 'Botanique',
  //     city: 'Brussels',
  //     comment: 'Rotonde',
  //     url: 'https://botanique.be/en/concert/medhane-2022',
  //     date: new Date()
  //   },
  //   {
  //     title: "Yevgueni",
  //     location: 'HetDepot',
  //     city: 'Leuven',
  //     comment: 'Met een nieuw album!',
  //     url: 'https://www.hetdepot.be/concert/yevgueni-0',
  //     date: new Date()
  //   }
  // ]

  state: State = {
    baseUrl: 'https://event-api-6bbi2ttrza-oa.a.run.app/api/events',
    totalPages: 0,
    page: 1,
    concerts: [],
    titleSearchTerm: ""
  }

  async getConcerts() {
    const res = await fetch(this.state.baseUrl + '?page=' + this.state.page+'&title='+this.state.titleSearchTerm);
    const res_json = await res.json();
    this.setState({
      totalPages: res_json['last_page'],
      page: res_json['page'],
      concerts: res_json['data']
    })

  }

  async componentDidMount() {
    this.getConcerts();
  }

  handlePageClick = (event: { selected: number; }) => {
    this.setState({ page: event.selected + 1}, () => {
      this.getConcerts();
    });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ titleSearchTerm: event.currentTarget.titlesearch.value, page: 1}, () => {
      this.getConcerts();
    })
  }

  render() {
    return (
      <div className="App">
        <span className='heading'>CrONCERT</span>
        <SearchField handleFormSubmit={this.handleSearch}></SearchField>
        <ConcertList
          concerts={this.state.concerts}
          page={this.state.page}
          totalPages={this.state.totalPages}
          handlePagination={this.handlePageClick}></ConcertList>
      </div>
    );

  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Routes>
//           <Route path="/" element={SearchPage} />
//         </Routes>
//       </div>
//     );
//   }
// }

export default App;