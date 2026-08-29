import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { LightTextColor } from "../components/Constants";
import { CHARSET, FLIP_INTERVAL_MS } from "./flapCharset";

const flipDown = keyframes`
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(-100deg);
  }
`;

const CELL_WIDTH = "clamp(14px, 4.4vw, 36px)";
const CELL_HEIGHT = "clamp(22px, 6.8vw, 54px)";
const CELL_FONT_SIZE = "clamp(12px, 3.8vw, 32px)";

const CellBox = styled.div`
  position: relative;
  flex: none;
  width: ${CELL_WIDTH};
  height: ${CELL_HEIGHT};
  margin: 1px;
  border-radius: 3px;
  background: #100e17;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 2px 3px rgba(0, 0, 0, 0.5);
  perspective: 120px;
`;

const charFace = `
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Courier New", monospace;
  font-size: ${CELL_FONT_SIZE};
  font-weight: 700;
  color: ${LightTextColor};
  border-radius: 3px;
`;

const Face = styled.div`
  ${charFace}

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: rgba(0, 0, 0, 0.65);
  }
`;

const Leaf = styled.div`
  ${charFace}
  background: #100e17;
  backface-visibility: hidden;
  transform-origin: bottom center;
  animation: ${flipDown} 80ms linear forwards;
`;

const nonBreaking = (char: string) => (char === " " ? "\u00A0" : char);

interface Props {
  targetChar: string;
  spinning: boolean;
}

// A single mechanical flap tile: rolls forward through CHARSET, in physical order and at a
// constant flip speed (no easing/slow-down), from whatever it shows until it hits `targetChar`.
const FlapCharacter = ({ targetChar, spinning }: Props) => {
  const [displayedChar, setDisplayedChar] = useState(targetChar);
  const displayedCharRef = useRef(targetChar);
  const flipCounterRef = useRef(0);
  const pendingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [flip, setFlip] = useState<{ key: number; char: string } | null>(null);

  useEffect(() => {
    // Only a new spin starting should (re)schedule flips; `spinning` turning
    // false again must not cancel flips already in flight for this tile.
    if (!spinning) return;

    pendingTimeoutsRef.current.forEach(clearTimeout);
    pendingTimeoutsRef.current = [];

    const startChar = displayedCharRef.current;
    const startIndex = Math.max(0, CHARSET.indexOf(startChar));
    const targetIndex = Math.max(0, CHARSET.indexOf(targetChar));
    const steps = (targetIndex - startIndex + CHARSET.length) % CHARSET.length;

    for (let i = 1; i <= steps; i++) {
      const charAtStep = CHARSET[(startIndex + i) % CHARSET.length];
      pendingTimeoutsRef.current.push(
        setTimeout(() => {
          flipCounterRef.current += 1;
          setFlip({
            key: flipCounterRef.current,
            char: displayedCharRef.current,
          });
          displayedCharRef.current = charAtStep;
          setDisplayedChar(charAtStep);
        }, i * FLIP_INTERVAL_MS),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, targetChar]);

  // Only cancel pending flips when the tile itself unmounts, not on every render.
  useEffect(() => {
    return () => pendingTimeoutsRef.current.forEach(clearTimeout);
  }, []);

  return (
    <CellBox>
      <Face>{nonBreaking(displayedChar)}</Face>
      {flip && <Leaf key={flip.key}>{nonBreaking(flip.char)}</Leaf>}
    </CellBox>
  );
};

export default FlapCharacter;
