import evaluate from "../src/evaluate";
describe("Test Prefix Expression's evaluate for premitives", () => {
  test("for string", () => {
    expect(evaluate("testString")).toEqual("testString");
  });

  test("for number", () => {
    expect(evaluate(10.3)).toEqual(10.3);
  });

  test("for boolean", () => {
    expect(evaluate(false)).toEqual(false);
  });

  test("for null", () => {
    expect(evaluate(null)).toBeNull();
  });

  test("for array", () => {
    expect(evaluate(["test", 9.8, false, {}, []])).toEqual([
      "test",
      9.8,
      false,
      {},
      []
    ]);
  });

  test("for object", () => {
    expect(
      evaluate({
        string: "test",
        number: 9.8,
        boolean: false,
        object: {},
        array: []
      })
    ).toEqual({
      string: "test",
      number: 9.8,
      boolean: false,
      object: {},
      array: []
    });
  });

  test("for function", () => {
    expect(() =>
      evaluate({
        "+": (a: number) => {
          return a + 1;
        }
      })
    ).toThrowError("invalid expression");
  });
});

describe("Test Prefix Expression's evaluate custom operators", () => {
  test("limit operations", () => {
    expect(evaluate({ "*": [5, 6] }, {}, ["+"])).toEqual({ "*": [5, 6] });
  });

  test("invalid operator", () => {
    expect(() => evaluate({ "*": [5, 6] }, {}, ["tada"])).toThrowError(
      "No default Operation Logic for tada"
    );
  });

  test("override operator", () => {
    expect(
      evaluate({ "*": [5, 6] }, {}, [
        {
          name: "*",
          logic: operands => {
            return operands[0];
          }
        }
      ])
    ).toEqual(5);
  });
});
