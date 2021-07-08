import { evaluate } from "../src";

describe("Test Entry point", () => {
  test("for evaluate", () => {
    expect(evaluate({ "+": [1, 2] })).toEqual(3);
  });
});
