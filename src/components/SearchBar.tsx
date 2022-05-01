import React, { useState } from "react";
import DatePicker from "react-datepicker";

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
        <DatePicker selected={startDate} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default SearchBar;
