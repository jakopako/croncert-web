// Fixed physical "wheel" of characters a real split-flap tile cycles through, in order.
export const CHARSET =
  " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.,&'-()!?/";

// Constant mechanical flip speed - every tile flips at the same rate, no easing/slow-down.
export const FLIP_INTERVAL_MS = 90;

// Worst case: a tile has to travel almost the full wheel in one direction.
const MAX_SPIN_STEPS = CHARSET.length - 1;
export const SPIN_DURATION_MS = MAX_SPIN_STEPS * FLIP_INTERVAL_MS + 500;

// Uppercases, strips accents, and maps anything outside CHARSET to a blank flap.
export const sanitizeChar = (char: string): string => {
  const normalized = char
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return CHARSET.includes(normalized) ? normalized : " ";
};

export const sanitizeText = (text: string): string =>
  text
    .split("")
    .map((char) => sanitizeChar(char))
    .join("");

