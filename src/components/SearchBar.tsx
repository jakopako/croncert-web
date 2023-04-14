import React, { useState } from "react";
import calendarIcon from "./icon-calendar-96.png";
import { NoConcerts } from "./NoConcerts";

interface Props {
  handleTitleChange: (event: React.FormEvent<HTMLFormElement>) => void;
  onCitySubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  triggerCitySubmit: (s: string) => void;
  // handleDateChange: (date: Date) => void;
  calendarIsOpen: boolean;
  setCalendarIsOpen: (value: boolean) => void;
  citySuggestions: Array<string>;
}

const SearchBar = ({
  handleTitleChange,
  onCitySubmit,
  triggerCitySubmit,
  calendarIsOpen,
  setCalendarIsOpen,
  citySuggestions,
}: Props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<Boolean>(false);
  const [userCityInput, setUserCityInput] = useState<string>("");

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCalendarIsOpen(!calendarIsOpen);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const onCityChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = e.currentTarget.citysearch.value;
    const filteredSuggestions = citySuggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(filteredSuggestions);
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserCityInput(userInput);
  };

  const onKeyDown = (e: { preventDefault: () => void; keyCode: number }) => {
    // e.preventDefault();
    if (showSuggestions && userCityInput) {
      // User pressed the enter key
      if (e.keyCode === 13) {
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserCityInput(filteredSuggestions[activeSuggestion]);
      }
      // User pressed the up arrow
      else if (e.keyCode === 38) {
        e.preventDefault();
        if (activeSuggestion === 0) {
          return;
        }

        setActiveSuggestion(activeSuggestion - 1);
        // setUserCityInput(filteredSuggestions[activeSuggestion]);
      }
      // User pressed the down arrow
      else if (e.keyCode === 40) {
        if (activeSuggestion + 1 === filteredSuggestions.length) {
          return;
        }

        setActiveSuggestion(activeSuggestion + 1);
        // setUserCityInput(filteredSuggestions[activeSuggestion]);
      }
      // TODO on ESC close list
    }
  };

  const onCityClick = (e: {
    currentTarget: { innerText: React.SetStateAction<string> };
  }) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserCityInput(e.currentTarget.innerText);
    triggerCitySubmit(e.currentTarget.innerText.toString());
  };

  let suggestionsListComponent;
  if (filteredSuggestions.length) {
    suggestionsListComponent = (
      <div className="suggestions-wrapper__container">
        <div className="suggestions-wrapper">
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onCityClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    suggestionsListComponent = (
      <div className="suggestions-wrapper__container">
        <div className="suggestions-wrapper">
          <NoConcerts />
        </div>
      </div>
    );
  }

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
        onSubmit={onCitySubmit}
        onChange={onCityChange}
      >
        <input
          id="citysearch"
          type="input"
          placeholder="City"
          className="searchbar_input_city"
          value={userCityInput}
          onKeyDown={onKeyDown}
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
      {showSuggestions && userCityInput && suggestionsListComponent}
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
