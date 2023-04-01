import React from "react";
import calendarIcon from "./icon-calendar-96.png";

interface Props {
  handleTitleChange: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCityChange: (event: React.FormEvent<HTMLFormElement>) => void;
  // handleDateChange: (date: Date) => void;
  calendarIsOpen: boolean;
  setCalendarIsOpen: (value: boolean) => void;
}

const SearchBar = ({
  handleTitleChange,
  handleCityChange,
  calendarIsOpen,
  setCalendarIsOpen,
}: Props) => {
  // const startDate = new Date();
  // const handleDateSelectorChange = (date: Date) => {
  //   setIsOpen(!isOpen);
  //   handleDateChange(date);
  // };
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCalendarIsOpen(!calendarIsOpen);
  };
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <div className="searchbar__box">
      <form
        className="searchbar__title"
        onChange={handleTitleChange}
        onSubmit={onSubmit}
      >
        <input
          id="titlesearch"
          type="input"
          placeholder="Title"
          className="searchbar_input_title"
        />
      </form>
      <form
        className="searchbar__city"
        onChange={handleCityChange}
        onSubmit={onSubmit}
      >
        <input
          id="citysearch"
          type="input"
          placeholder="City"
          className="searchbar_input_city"
        />
      </form>
      <div className="datepicker-button__container">
        <button
          className="datepicker-button"
          onClick={handleClick}
          type="submit"
        >
          <img src={calendarIcon} width="20" height="20" alt="calendar icon" />
        </button>
      </div>
      {/* <div className="datepicker__container">
        {isOpen && (
          <DatePicker
            selected={startDate}
            onChange={handleDateSelectorChange}
            inline
          />
        )}
      </div> */}
    </div>
  );
};

export default SearchBar;
