import React, { ChangeEvent } from "react";
import radiusIcon from "./radius.png";
import calendarIcon from "./icon-calendar-96.png";
import { format } from "date-fns";

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
    <div className="filter-wrapper__container">
      {isOpen && (
        <div className="filter__container">
          <div className="filter__item">
            <input
              type="range"
              onChange={handleRadiusChange}
              min={0}
              max={200}
              step={10}
              value={radius}
              className="range-slider"
            ></input>
            <span className="range-slider__value">{radius} km</span>
            <img src={radiusIcon} width="22" height="22" alt="radius icon" />
          </div>
          <div className="filter__item">
            <button
              className="datepicker-date__container"
              onClick={handleCalendarClick}
            >
              {date && format(date, "d/M/yy")}
              {!date && "select date"}
            </button>
            {date && (
              <button className="datepicker-remove-date" onClick={resetDate}>
                x
              </button>
            )}
            <button
              className="datepicker-button"
              onClick={handleCalendarClick}
              type="submit"
            >
              <img
                src={calendarIcon}
                width="25"
                height="25"
                alt="calendar icon"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
