import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for and operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "&&": [] })).toThrowError(
      "&& operator needs exactly 2 operands"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ "&&": [10] })).toThrowError(
      "&& operator needs exactly 2 operands"
    );
  });

  test("with two operands", () => {
    expect(evaluate({ "&&": [true, false] })).toEqual(false);
  });

  test("with three operands", () => {
    expect(() => evaluate({ "&&": [10, 30, 50] })).toThrowError(
      "&& operator needs exactly 2 operands"
    );
  });

  test("with negative right", () => {
    expect(evaluate({ "&&": [false, -3] })).toEqual(false);
  });

  test("with negative left", () => {
    expect(evaluate({ "&&": [-10, true] })).toEqual(true);
  });

  test("with string", () => {
    expect(evaluate({ "&&": ["shhhh", false] })).toEqual(false);
  });

  test("with boolean : true - true", () => {
    expect(evaluate({ "&&": [true, true] })).toEqual(true);
  });

  test("with boolean : true - false", () => {
    expect(evaluate({ "&&": [true, false] })).toEqual(false);
  });
  test("with boolean : false - true", () => {
    expect(evaluate({ "&&": [false, true] })).toEqual(false);
  });
  test("with boolean : false - false", () => {
    expect(evaluate({ "&&": [false, false] })).toEqual(false);
  });

  test("with null", () => {
    expect(evaluate({ "&&": [0, null] })).toEqual(false);
  });

  test("with object", () => {
    expect(evaluate({ "&&": [false, { a: "x" }] })).toEqual(false);
  });

  test("with nested operation", () => {
    expect(evaluate({ "&&": [true, { "&&": [true, true] }] })).toEqual(true);
  });

  test("with unresolved operand as right", () => {
    expect(evaluate({ "&&": [true, { someOperator: [5, 6] }] })).toEqual({
      "&&": [true, { someOperator: [5, 6] }]
    });
  });

  test("with unresolved operand as left", () => {
    expect(evaluate({ "&&": [{ someOperator: [5, 6] }, false] })).toEqual({
      "&&": [{ someOperator: [5, 6] }, false]
    });
  });
});
