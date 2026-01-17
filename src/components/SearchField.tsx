import React from "react";
import styled from "styled-components";
import { SearchBarBackgroundColor, TextColor } from "./Constants";

const SearchForm = styled.form`
  display: flex;
  max-width: 800px;
  height: 20px;
  width: 90%;
  position: relative;
  background: ${SearchBarBackgroundColor};
  border: 1px solid ${TextColor};
  padding: 10px 0 10px 0;
`;

const SearchInput = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0);
  font-family: inherit;
  font-weight: 300;
  font-size: 16px;
  float: left;
  height: 20px;
  color: ${TextColor};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgb(146, 153, 121);
    opacity: 1;
  }
`;

const SearchInputTitle = styled(SearchInput)`
  width: 60%;
  padding-left: 20px;
`;

const SearchInputCity = styled(SearchInput)`
  width: 40%;
  padding-left: 10px;
  border-left: 1px solid ${TextColor};
`;

interface Props {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchField = ({ handleFormSubmit }: Props) => {
  return (
    <SearchForm onSubmit={handleFormSubmit}>
      <SearchInputTitle id="titlesearch" type="input" placeholder="Title" />
      <SearchInputCity id="citysearch" type="input" placeholder="City" />
    </SearchForm>
  );
};

export default SearchField;
