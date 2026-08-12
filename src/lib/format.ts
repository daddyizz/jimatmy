export const formatRM = (value: number): string =>
  `RM${(Number.isFinite(value) ? value : 0).toLocaleString("ms-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatPercent = (value: number, digits = 1): string =>
  `${(Number.isFinite(value) ? value : 0).toFixed(digits)}%`;

/** Parses a text input into a non-negative number. Returns 0 for blanks. */
export const parseAmount = (raw: string): number => {
  const n = Number.parseFloat(raw.replace(/,/g, ""));
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : n;
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
