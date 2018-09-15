export const randomId = (min: number, max: number): string =>
  (Math.floor(Math.random() * max) + min).toString();
