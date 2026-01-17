import React, { ChangeEvent } from "react";
import styled from "styled-components";
import radiusIcon from "./radius.png";
import calendarIcon from "./icon-calendar-96.png";
import { format } from "date-fns";
import {
  SearchBarBackgroundColor,
  BorderColor,
  TextColor,
  FilterSliderColor,
  FilterThumbColor,
} from "./Constants";

const FilterWrapperContainer = styled.div`
  max-width: 802px;
  width: 90%;
  margin-top: 205px;
  position: absolute;
  z-index: 10;
`;

const FilterContainer = styled.div`
  background: ${SearchBarBackgroundColor};
  border: 1px solid ${BorderColor};
  float: right;

  img {
    float: right;
  }
`;

const FilterItem = styled.div`
  width: 230px;
  height: 22px;
  margin: 20px;
  display: flex;
  align-items: center;

  > img {
    margin-right: 2px;
  }
`;

const RangeSlider = styled.input`
  float: left;
  cursor: pointer;
  appearance: none;
  width: 120px;
  height: 3px;
  background: ${FilterSliderColor};
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid ${BorderColor};
    background: ${FilterThumbColor};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid ${BorderColor};
    background: ${FilterThumbColor};
    cursor: pointer;
  }
`;

const RangeSliderValue = styled.span`
  width: 80px;
  margin-left: 5px;
  color: ${TextColor};
`;

const DatepickerDateContainer = styled.button`
  all: unset;
  cursor: pointer;
  border: none;
  background: rgb(0, 0, 0, 0);
  width: 100%;
  height: 22px;
  margin-left: 3px;
  display: flex;
  align-items: center;
`;

const DatepickerRemoveDate = styled.button`
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 16px;
  font-family: inherit;
  color: ${TextColor};
`;

const DatepickerButton = styled.button`
  background-color: rgba(255, 255, 255, 0);
  border: none;
  padding: 0;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  isOpen: boolean;
  radius: number;
  date: Date | undefined;
  handleDateChange: (date: Date) => void;
  handleRadiusChange: (event: ChangeEvent<HTMLInputElement>) => void;
  calendarIsOpen: boolean;
  setCalendarIsOpen: (value: boolean) => void;
}

const Filter = ({
  isOpen,
  radius,
  date,
  handleDateChange,
  handleRadiusChange,
  calendarIsOpen,
  setCalendarIsOpen,
}: Props) => {
  const handleCalendarClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCalendarIsOpen(!calendarIsOpen);
  };

  const resetDate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleDateChange(undefined!);
  };

  return (
    <FilterWrapperContainer>
      {isOpen && (
        <FilterContainer>
          <FilterItem>
            <RangeSlider
              type="range"
              onChange={handleRadiusChange}
              min={0}
              max={200}
              step={10}
              value={radius}
            ></RangeSlider>
            <RangeSliderValue>{radius} km</RangeSliderValue>
            <img src={radiusIcon} width="22" height="22" alt="radius icon" />
          </FilterItem>
          <FilterItem>
            <DatepickerDateContainer onClick={handleCalendarClick}>
              {date && format(date, "d/M/yy")}
              {!date && "select date"}
            </DatepickerDateContainer>
            {date && (
              <DatepickerRemoveDate onClick={resetDate}>x</DatepickerRemoveDate>
            )}
            <DatepickerButton onClick={handleCalendarClick} type="submit">
              <img
                src={calendarIcon}
                width="25"
                height="25"
                alt="calendar icon"
              />
            </DatepickerButton>
          </FilterItem>
        </FilterContainer>
      )}
    </FilterWrapperContainer>
  );
};

export default Filter;
