import './App.css';
import ConcertList from './components/ConcertList';
import SearchField from './components/SearchField';

const App: React.FC = () => {
  const concerts = [
    {
      title: "title1",
      location: 'location1',
      city: 'city1',
      comment: 'comment1',
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
