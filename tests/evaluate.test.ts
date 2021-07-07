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
});

describe("Test Prefix Expression's evaluate for add operation", () => {
  test("with one operand", () => {
    expect(evaluate({ "+": [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ "+": [10, 30] })).toEqual(40);
  });

  test("with three operands", () => {
    expect(evaluate({ "+": [10, 30, 50] })).toEqual(90);
  });

  test("with number string", () => {
    expect(evaluate({ "+": [10, "30", "50.5"] })).toEqual(90.5);
  });

  test("with boolean", () => {
    expect(evaluate({ "+": [10, true, "50.5", false] })).toEqual(61.5);
  });

  test("with null", () => {
    expect(evaluate({ "+": [10, null, "50.5"] })).toEqual(60.5);
  });

  test("with object", () => {
    expect(() =>
      evaluate({ "+": [10, true, null, "50.5", { a: "x" }] })
    ).toThrowError("Can not apply + Operation on operand at 4");
  });

  test("with nested operation", () => {
    expect(
      evaluate({ "+": [10, true, null, "50.5", { "+": [5, 6] }] })
    ).toEqual(72.5);
  });
});
