import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import filterIcon from "./uiFilter-512.webp";
import { NoConcerts } from "./NoConcerts";
import {
  SearchBarBackgroundColor,
  BorderColor,
  TextColor,
  PlaceholderTextColor,
} from "./Constants";

const SearchbarBox = styled.div`
  display: flex;
  max-width: 800px;
  height: 20px;
  width: 90%;
  position: relative;
  background: ${SearchBarBackgroundColor};
  border: 1px solid ${BorderColor};
  padding: 10px 0 10px 0;
`;

const SearchbarTitleForm = styled.form`
  width: 60%;
  padding-left: 20px;
`;

const SearchbarCityForm = styled.form`
  width: 40%;
  padding-left: 10px;
  border-left: 1px solid ${BorderColor};
`;

const SearchbarInput = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0);
  font-family: inherit;
  font-weight: 300;
  font-size: 16px;
  float: left;
  height: 20px;
  color: ${TextColor};
  width: 100%;

  &::placeholder {
    color: ${PlaceholderTextColor};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const HiddenCitySuggestions = styled.div`
  display: none;
`;

const SuggestionsWrapperContainer = styled.div`
  max-width: 800px;
  width: 96%;
  position: absolute;
  margin-top: 41px;
  z-index: 11;
`;

const SuggestionsWrapper = styled.div`
  background: ${SearchBarBackgroundColor};
  border: 1px solid ${BorderColor};
  float: right;
  width: 40%;
  min-width: 140px;
  text-align: left;
`;

const SuggestionsList = styled.ul`
  position: relative;
  margin: 0;
  padding: 10px;
  vertical-align: baseline;
  list-style: none;
  text-align: left;

  li {
    padding: 0.5rem;
    border: 1px solid transparent;

    &:hover,
    &.suggestion-active {
      cursor: pointer;
      font-weight: 400;
      border: 1px solid ${BorderColor};
    }
  }
`;

const FilterButtonContainer = styled.div`
  margin: 0;
  padding-right: 12px;
`;

const FilterButton = styled.button`
  background-color: rgba(255, 255, 255, 0);
  border: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

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
          userInput.toLowerCase().normalize("NFKD").replace(combining, ""),
        ),
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
      <SuggestionsWrapperContainer>
        <SuggestionsWrapper>
          <SuggestionsList>
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
          </SuggestionsList>
        </SuggestionsWrapper>
      </SuggestionsWrapperContainer>
    );
  } else {
    suggestionsListComponent = (
      <SuggestionsWrapperContainer>
        <SuggestionsWrapper>
          <NoConcerts setNotificationIsOpen={setNotificationIsOpen} />
        </SuggestionsWrapper>
      </SuggestionsWrapperContainer>
    );
  }

  return (
    <SearchbarBox>
      <SearchbarTitleForm onChange={handleTitleChange} onSubmit={onSubmit}>
        <SearchbarInput
          autoComplete="off"
          id="titlesearch"
          type="input"
          placeholder="Title"
          defaultValue={initialTitle}
          ref={ref}
        />
      </SearchbarTitleForm>
      <HiddenCitySuggestions>
        {citySuggestions.map((suggestion) => {
          return (
            <a href={"?city=" + suggestion} key={suggestion}>
              {"Concerts in " + suggestion + ". "}
            </a>
          );
        })}
      </HiddenCitySuggestions>
      <SearchbarCityForm onSubmit={onCitySubmit} onChange={onCityChange}>
        <SearchbarInput
          autoComplete="off"
          id="citysearch"
          type="input"
          placeholder="City"
          value={userCityInput}
          onKeyDown={onKeyDown}
        />
      </SearchbarCityForm>
      <FilterButtonContainer>
        <FilterButton onClick={handleFilterClick} type="submit">
          <img src={filterIcon} width="22" height="22" alt="filter icon" />
        </FilterButton>
      </FilterButtonContainer>
      {showSuggestions && userCityInput && suggestionsListComponent}
    </SearchbarBox>
  );
};

export default SearchBar;
