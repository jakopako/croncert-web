import styled from "styled-components";
import { format } from "date-fns";
import { ShuffleEvent } from "./model";
import FlapCharacter from "./FlapCharacter";
import { sanitizeText } from "./flapCharset";

const Board = styled.div`
  background: linear-gradient(#1b1725, #0d0b12);
  border-radius: 15px;
  padding: 20px 16px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.08) inset,
    0 12px 40px rgba(0, 0, 0, 0.5);
`;

const RowBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

interface RowProps {
  text: string;
  spinning: boolean;
}

const FlapRow = ({ text, spinning }: RowProps) => (
  <RowBox>
    {text.split("").map((char, index) => (
      <FlapCharacter key={index} targetChar={char} spinning={spinning} />
    ))}
  </RowBox>
);

// Every row has the same character count and every tile is the same size, like a real board.
const ROW_WIDTH = 20;
// Rows, top to bottom: title (2 rows, in case it's long), venue, city, genre(s), date/time.
const ROW_COUNT = 6;

const padRow = (text: string): string => {
  const sanitized = sanitizeText(text);
  return sanitized.length > ROW_WIDTH
    ? sanitized.slice(0, ROW_WIDTH)
    : sanitized.padEnd(ROW_WIDTH, " ");
};

const blankRow = (): string => padRow("");

const splitAcrossTwoRows = (text: string): [string, string] => {
  const sanitized = sanitizeText(text);
  const full =
    sanitized.length > ROW_WIDTH * 2
      ? sanitized.slice(0, ROW_WIDTH * 2)
      : sanitized.padEnd(ROW_WIDTH * 2, " ");
  return [full.slice(0, ROW_WIDTH), full.slice(ROW_WIDTH, ROW_WIDTH * 2)];
};

const buildEventRows = (event: ShuffleEvent): string[] => {
  const [titleRow1, titleRow2] = splitAcrossTwoRows(event.title);
  const venueRow = padRow(event.location);
  const cityRow = padRow(event.city);
  const genreRow = padRow(
    event.genres && event.genres.length > 0 ? event.genres.join(", ") : "",
  );
  const timeRow = padRow(format(new Date(event.date), "EEE d MMM HH:mm"));
  return [titleRow1, titleRow2, venueRow, cityRow, genreRow, timeRow];
};

const buildMessageRows = (lines: string[]): string[] => {
  const [line1, line2] = [padRow(lines[0] || ""), padRow(lines[1] || "")];
  return [line1, line2, blankRow(), blankRow(), blankRow(), blankRow()];
};

const blankRows = (): string[] => Array(ROW_COUNT).fill(blankRow());

interface Props {
  target: ShuffleEvent | null;
  message?: string[] | null;
  spinning: boolean;
}

// Airport-timetable style board: each tile rolls through the alphabet on its own,
// like a real split-flap display, before settling on `target`'s details (or `message`).
const SplitFlapBoard = ({ target, message, spinning }: Props) => {
  const rows = message
    ? buildMessageRows(message)
    : target
      ? buildEventRows(target)
      : blankRows();

  return (
    <Board>
      {rows.map((text, index) => (
        <FlapRow key={index} text={text} spinning={spinning} />
      ))}
    </Board>
  );
};

export default SplitFlapBoard;
