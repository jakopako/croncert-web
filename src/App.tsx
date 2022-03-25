import './App.css';
import ConcertList from './components/ConcertList';
import SearchField from './components/SearchField';

const App: React.FC = () => {
  const concerts = [
    {
      title: "Jugendblasorchester Zürich (JBOZ)",
      location: 'Tonhalle',
      city: 'Zurich',
      comment: 'Jugendblasorchester Zürich JBOZ',
      url: 'https://www.tonhalle-orchester.ch/en/concerts/kalender/jugendblasorchester-zrich-jboz-1439709/tz/',
      date: new Date()
    },
    {
      title: "MEDHANE",
      location: 'Botanique',
      city: 'Brussels',
      comment: 'Rotonde',
      url: 'https://botanique.be/en/concert/medhane-2022',
      date: new Date()
    },
    {
      title: "Yevgueni",
      location: 'HetDepot',
      city: 'Leuven',
      comment: 'Met een nieuw album!',
      url: 'https://www.hetdepot.be/concert/yevgueni-0',
      date: new Date()
    }
  ]
  return (
    <div className="App">
      <span className='heading'>CrONCERT</span>
      <SearchField></SearchField>
      <ConcertList concerts={concerts}></ConcertList>
    </div>
  );
}

export default App;
