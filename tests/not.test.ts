import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for not operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "!": [] })).toThrowError(
      "! operator needs exactly 1 operand"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ "!": [10] })).toEqual(false);
  });

  test("with two operands", () => {
    expect(() => evaluate({ "!": [11, 3] })).toThrowError(
      "! operator needs exactly 1 operand"
    );
  });

  test("with three operands", () => {
    expect(() => evaluate({ "!": [10, 30, 50] })).toThrowError(
      "! operator needs exactly 1 operand"
    );
  });

  test("with negative", () => {
    expect(evaluate({ "!": [-10] })).toEqual(false);
  });

  test("with string", () => {
    expect(evaluate({ "!": ["shhhhh"] })).toEqual(false);
  });

  test("with empty string", () => {
    expect(evaluate({ "!": [""] })).toEqual(true);
  });

  test("with boolean true ", () => {
    expect(evaluate({ "!": [true] })).toEqual(false);
  });

  test("with boolean false", () => {
    expect(evaluate({ "!": [false] })).toEqual(true);
  });

  test("with null", () => {
    expect(evaluate({ "!": [null] })).toEqual(true);
  });

  test("with object", () => {
    expect(evaluate({ "!": [{ a: "x" }] })).toEqual(false);
  });

  test("with nested operation", () => {
    expect(evaluate({ "!": [{ "!": [true] }] })).toEqual(true);
  });

  test("with unresolved operand", () => {
    expect(evaluate({ "!": [{ someOperator: [5, 6] }] })).toEqual({
      "!": [{ someOperator: [5, 6] }]
    });
  });
});
