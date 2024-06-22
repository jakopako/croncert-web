import React from "react";
import DatePicker from "react-datepicker";

interface Props {
  isOpen: boolean;
  date: Date | undefined;
  handleDateChange: (date: Date) => void;
}

const Calendar = ({ isOpen, date, handleDateChange }: Props) => {
  return (
    <div className="datepicker-wrapper__container">
      {isOpen && (
        <div className="datepicker__container">
          <DatePicker selected={date} onChange={handleDateChange} inline />
        </div>
      )}
    </div>
  );
};

export default Calendar;
