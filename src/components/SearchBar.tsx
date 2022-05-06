import React, { useState } from "react";
import DatePicker from "react-datepicker";
import calendarIcon from './calendar-icon.png'

interface Props {
  handleTitleChange: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCityChange: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDateChange: (date: Date) => void;
}

const SearchBar = ({
  handleTitleChange,
  handleCityChange,
  handleDateChange,
}: Props) => {
  const startDate = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const handleDateSelectorChange = (date: Date) => {
    setIsOpen(!isOpen);
    handleDateChange(date);
  };
  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div className="searchbar__box">
      <form className="searchbar__title" onChange={handleTitleChange}>
        <input
          id="titlesearch"
          type="input"
          placeholder="Title"
          className="searchbar_input_title"
        />
      </form>
      <form className="searchbar__city" onChange={handleCityChange}>
        <input
          id="citysearch"
          type="input"
          placeholder="City"
          className="searchbar_input_city"
        />
      </form>
      <div className="datepicker__container">
        <button className="datepicker__button" onClick={handleClick} type="submit">
          <img src={calendarIcon} width="20" height="20" />
        </button>
        {isOpen && (
          <DatePicker selected={startDate} onChange={handleDateSelectorChange} inline />)}
      </div>
    </div>
  );
};

export default SearchBar;
