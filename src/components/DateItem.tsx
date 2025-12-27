import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { ConcertItemField, ConcertItemWrapper } from "./ConcertItem";

const ConcertItemDate = styled.div`
  font-size: 20px;
  padding: 5px 0px 2px 5px;
  font-weight: 600;
`;

interface Props {
  date: Date | undefined;
}

export const DateItem = ({ date }: Props) => {
  return (
    <ConcertItemWrapper>
      <ConcertItemField>
        <ConcertItemDate>
          {date ? format(date, "EE, d. MMM. yyyy") : ""}
        </ConcertItemDate>
      </ConcertItemField>
    </ConcertItemWrapper>
  );
};
