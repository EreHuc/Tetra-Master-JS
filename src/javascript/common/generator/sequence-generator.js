/* eslint-disable no-plusplus */

// @flow

/**
 * Function that return a number between 0 - maxNumber indefinitely
 * @param maxNumber
 * @returns {IterableIterator<number>}
 */
export function* infiniteSequence(maxNumber: number): Iterator<number> {
  let index = 0;
  while (true) {
    const nextIndex = index + 1;
    if (nextIndex > maxNumber) {
      index = 0;
    }
    yield index++;
  }
}