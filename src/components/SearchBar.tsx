import React, { useEffect, useRef, useState } from "react";
import filterIcon from "./uiFilter-512.webp";
import { NoConcerts } from "./NoConcerts";

interface Props {
  handleTitleChange: (event: React.FormEvent<HTMLFormElement>) => void;
  onCitySubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  triggerCitySubmit: (s: string) => void;
  setCalendarIsOpen: (value: boolean) => void;
  filterIsOpen: boolean;
  setFilterIsOpen: (value: boolean) => void;
  citySuggestions: Array<string>;
  initialTitle: string;
  initialCity: string;
  setNotificationIsOpen: (value: boolean) => void;
}

const SearchBar = ({
  handleTitleChange,
  onCitySubmit,
  triggerCitySubmit,
  setCalendarIsOpen,
  filterIsOpen,
  setFilterIsOpen,
  citySuggestions,
  initialTitle,
  initialCity,
  setNotificationIsOpen,
}: Props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<Boolean>(false);
  const [userCityInput, setUserCityInput] = useState<string>(initialCity);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (initialTitle.length === 0) {
        ref.current.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFilterIsOpen(!filterIsOpen);
    setCalendarIsOpen(false);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const onCityChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = e.currentTarget.citysearch.value;
    // https://stackoverflow.com/questions/11815883/convert-non-ascii-characters-umlauts-accents-to-their-closest-ascii-equiva
    const combining = /[\u0300-\u036F]/g;
    const filteredSuggestions = citySuggestions.filter((suggestion) =>
      suggestion
        .toLowerCase()
        .normalize("NFKD")
        .replace(combining, "")
        .startsWith(
          userInput.toLowerCase().normalize("NFKD").replace(combining, "")
        )
    );
    setFilteredSuggestions(filteredSuggestions);
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserCityInput(userInput);
  };

  const onKeyDown = (e: { preventDefault: () => void; keyCode: number }) => {
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
      }
      // User pressed the down arrow
      else if (e.keyCode === 40) {
        if (activeSuggestion + 1 === filteredSuggestions.length) {
          return;
        }

        setActiveSuggestion(activeSuggestion + 1);
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
          <NoConcerts setNotificationIsOpen={setNotificationIsOpen} />
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
          autoComplete="off"
          id="titlesearch"
          type="input"
          placeholder="Title"
          className="searchbar_input_title"
          defaultValue={initialTitle}
          ref={ref}
        />
      </form>
      <div className="hidden-city-suggestions">
        {citySuggestions.map((suggestion) => {
          return (
            <a href={"?city=" + suggestion}>{"Concerts in " + suggestion}</a>
          );
        })}
      </div>
      <form
        className="searchbar__city"
        onSubmit={onCitySubmit}
        onChange={onCityChange}
      >
        <input
          autoComplete="off"
          id="citysearch"
          type="input"
          placeholder="City"
          className="searchbar_input_city"
          value={userCityInput}
          onKeyDown={onKeyDown}
        />
      </form>
      <div className="filter-button__container">
        <button
          className="filter-button"
          onClick={handleFilterClick}
          type="submit"
        >
          <img src={filterIcon} width="22" height="22" alt="filter icon" />
        </button>
      </div>
      {showSuggestions && userCityInput && suggestionsListComponent}
    </div>
  );
};

export default SearchBar;
