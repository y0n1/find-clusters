export const fixtures = {
  0: {
    // deno-fmt-ignore
    input: [
      [0, 1, 0, 0, 1],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0],
    ],
    // deno-fmt-ignore
    expected: [
      [0, 1, 0, 0, 2],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [3, 0, 0, 0, 4],
      [3, 0, 0, 4, 0],
    ],
  },
  1: {
    // deno-fmt-ignore
    input: [
      [1, 1],
      [1, 1],
    ],
    // deno-fmt-ignore
    expected: [
      [1, 1],
      [1, 1],
    ],
  },
  2: {
    // deno-fmt-ignore
    input: [
      [0, 0],
      [0, 0],
    ],
    // deno-fmt-ignore
    expected: [
      [0, 0],
      [0, 0],
    ],
  },
};
