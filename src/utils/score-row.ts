export const getScoreRows = (bestOf: number) => {
  if (bestOf <= 0) return [];

  let remaining = bestOf === 2 ? 2 : Math.ceil(bestOf / 2);

  const rows: number[] = [];

  while (remaining > 4) {
    rows.unshift(4);
    remaining -= 4;
  }

  rows.unshift(remaining);

  return rows;
};
