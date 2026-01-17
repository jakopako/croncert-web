import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import {
  SearchBarBackgroundColor,
  BorderColor,
  GreyTextColor,
  FilterThumbColor,
} from "./Constants";

const DatepickerWrapperContainer = styled.div`
  max-width: 802px;
  width: 90%;
  position: absolute;
  margin-top: 310px;
  z-index: 10;
`;

const DatepickerContainer = styled.div`
  background: ${SearchBarBackgroundColor};
  border: 1px solid ${BorderColor};
  float: right;

  .react-datepicker {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 10px;
    vertical-align: baseline;
  }

  .react-datepicker__month-container {
    font-size: 18px;
  }

  .react-datepicker__header {
    margin-top: 5px;
    position: relative;
  }

  .react-datepicker__day-names {
    margin-top: 8px;
    font-weight: 400;
    display: flex;
  }

  .react-datepicker__week {
    display: flex;
  }

  .react-datepicker__day {
    width: 25px;
    height: 18px;
    padding: 7px;
    border: 1px solid ${SearchBarBackgroundColor};

    &:hover {
      padding: 7px;
      border: 1px solid ${BorderColor};
      cursor: pointer;
    }
  }

  .react-datepicker__day--selected {
    padding: 7px;
    border: 1px solid ${BorderColor};
    background: ${FilterThumbColor};
  }

  .react-datepicker__day-name {
    width: 25px;
    height: 18px;
    padding: 8px;
  }

  .react-datepicker__month {
    margin-top: 2px;
  }

  .react-datepicker__navigation {
    z-index: 11;
    display: flex;
    position: absolute;
    text-indent: -9999px;
    height: 20px;
    width: 20px;
    white-space: nowrap;
    overflow: hidden;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .react-datepicker__navigation--previous {
    top: 13px;
    left: 15px;
    background-image: url("arrow-48.png");
    background-size: 20px;
    transform: rotate(-90deg);
    background-color: rgba(255, 255, 255, 0);
  }

  .react-datepicker__navigation--next {
    top: 13px;
    right: 15px;
    background-image: url("arrow-48.png");
    background-size: 20px;
    transform: rotate(90deg);
    background-color: rgba(255, 255, 255, 0);
  }

  .react-datepicker__day--outside-month {
    color: ${GreyTextColor};
  }

  .react-datepicker__day--today {
    background: ${FilterThumbColor};
  }
`;

interface Props {
  isOpen: boolean;
  date: Date | undefined;
  handleDateChange: (date: Date) => void;
}

const Calendar = ({ isOpen, date, handleDateChange }: Props) => {
  return (
    <DatepickerWrapperContainer>
      {isOpen && (
        <DatepickerContainer>
          <DatePicker selected={date} onChange={handleDateChange} inline />
        </DatepickerContainer>
      )}
    </DatepickerWrapperContainer>
  );
};

export default Calendar;
