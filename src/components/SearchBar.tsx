import React from "react";

interface Props {
  handleTitleChange: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCityChange: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({ handleTitleChange, handleCityChange }: Props) => {
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
    </div>
  );
};

export default SearchBar;
