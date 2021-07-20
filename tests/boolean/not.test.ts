import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for not operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "!": [] })).toThrowError(
      " must NOT have fewer than 1 items"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ "!": [1] })).toEqual(false);
  });

  test("with two operands", () => {
    expect(() => evaluate({ "!": [11, 3] })).toThrowError(
      " must NOT have more than 1 items"
    );
  });

  test("with three operands", () => {
    expect(() => evaluate({ "!": [10, 30, 50] })).toThrowError(
      " must NOT have more than 1 items"
    );
  });

  test("with negative", () => {
    expect(() => evaluate({ "!": [-10] })).toThrowError("/0 must be boolean");
  });

  test("with string", () => {
    expect(() => evaluate({ "!": ["shhhhh"] })).toThrowError(
      "/0 must be boolean"
    );
  });

  test("with empty string", () => {
    expect(() => evaluate({ "!": [""] })).toThrowError("/0 must be boolean");
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
    expect(() => evaluate({ "!": [{ a: "x" }] })).toThrowError(
      "/0 must be boolean"
    );
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
