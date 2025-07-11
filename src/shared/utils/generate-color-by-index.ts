export const generateColorByIndex = (index: number): string =>
  `hsl(${(index * 43) % 360}, 72%, 35%)`;
