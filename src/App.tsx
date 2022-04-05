import React, { Component } from 'react';
import './App.css';
import ConcertList from './components/ConcertList';
import { Concert } from './model';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

type State = {
  baseUrl: string;
  page: number;
  totalPages: number;
  concerts: Array<Concert>;
  titleSearchTerm: string;
  citySearchTerm: string;
}

type Props = {
  history: History;
  location: Location;
};

class App extends Component {

  state: State = {
    baseUrl: 'https://event-api-6bbi2ttrza-ew.a.run.app/api/events',
    totalPages: 0,
    page: 1,
    concerts: [],
    titleSearchTerm: "",
    citySearchTerm: ""
  }

  async getConcerts() {
    const res = await fetch(this.state.baseUrl + '?page=' + this.state.page + '&title=' + this.state.titleSearchTerm + '&city=' + this.state.citySearchTerm);
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
    this.setState({ page: event.selected + 1 }, () => {
      this.getConcerts();
    });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      titleSearchTerm: event.currentTarget.titlesearch.value,
      citySearchTerm: event.currentTarget.citysearch.value,
      page: 1
    }, () => {
      this.getConcerts();
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      page: 1
    }, () => {
      this.getConcerts();
    })
  }

  handleTitleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      titleSearchTerm: event.currentTarget.titlesearch.value
    })
  } 

  handleCityChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      citySearchTerm: event.currentTarget.citysearch.value,
    })
  }

  render() {
    return (
      <div className="App">
        <span className='heading'>CrONCERT</span>
        {/* <SearchField handleFormSubmit={this.handleSearch}></SearchField> */}
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleTitleChange={this.handleTitleChange}
          handleCityChange={this.handleCityChange} />
        <ConcertList
          concerts={this.state.concerts}
          page={this.state.page}
          totalPages={this.state.totalPages}
          handlePagination={this.handlePageClick} />
        <Footer/>
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