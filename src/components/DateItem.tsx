import React from "react";
import { format } from "date-fns";

interface Props {
  date: Date | undefined;
}

export const DateItem = ({ date }: Props) => {
  return (
    <div className="concertitem__box">
      <div className="concertitem__field">
        <div className="concertitem__date">
          {date ? format(date, "EE, d. MMM. yyyy") : ""}
        </div>
      </div>
    </div>
  );
};
