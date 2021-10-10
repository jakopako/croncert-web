import './App.css';
import React from 'react';
import './index.css';
import { format, parseISO } from "date-fns";

function App() {
  return (
    <Concerts/>
  );
}

class Concerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://croncert-api.herokuapp.com/api/concerts?limit=20")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result['data']
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ConcertList list={items} />
      );
    }
  }
}

const ConcertList = ({ list }) => (
  <ul className="concert-list">
    {list.map(item => (
      <ListItem item={item} />
    ))}
  </ul>
);

const ListItem = ({ item }) => (
  <li className="concert-item">
    <div className="concert-artist"><a href={item.link}>{item.artist}</a></div>
    <div>{item.comment}</div>
    <div className="concert-location">{item.location}</div>
    <div>{format(parseISO(item.date), "dd.MM.yyyy  HH:mm")}</div>
  </li>
);

export default App;
