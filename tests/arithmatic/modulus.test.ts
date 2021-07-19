import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for modulus operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "%": [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ "%": [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with two operands", () => {
    expect(evaluate({ "%": [11, 3] })).toEqual(2);
  });

  test("with three operands", () => {
    expect(() => evaluate({ "%": [10, 30, 50] })).toThrowError(
      " must NOT have more than 2 items"
    );
  });

  test("with negative divisor", () => {
    expect(evaluate({ "%": [10, -3] })).toEqual(1);
  });

  test("with negative dividend", () => {
    expect(evaluate({ "%": [-10, 3] })).toEqual(-1);
  });

  test("with number string", () => {
    expect(evaluate({ "%": [10, "3.5"] })).toEqual(3);
  });

  test("with boolean : true for divisor", () => {
    expect(evaluate({ "%": [10, true] })).toEqual(0);
  });

  test("with boolean : false for divisor", () => {
    expect(evaluate({ "%": [10, false] })).toBeNaN();
  });

  test("with boolean : true for dividend", () => {
    expect(evaluate({ "%": [true, 3] })).toEqual(1);
  });

  test("with boolean : false for dividend", () => {
    expect(evaluate({ "%": [false, 2] })).toEqual(0);
  });

  test("with null", () => {
    expect(evaluate({ "%": [10, null] })).toBeNaN();
  });

  test("with object as divisor", () => {
    expect(() => evaluate({ "%": [10, { a: "x" }] })).toThrowError(
      "/1 must be number"
    );
  });

  test("with object as dividend", () => {
    expect(() => evaluate({ "%": [{ a: "x" }, 2] })).toThrowError(
      "/0 must be number"
    );
  });

  test("with nested operation", () => {
    expect(evaluate({ "%": [11, { "%": [5, 3] }] })).toEqual(1);
  });

  test("with unresolved operand as divisor", () => {
    expect(evaluate({ "%": [10, { someOperator: [5, 6] }] })).toEqual({
      "%": [10, { someOperator: [5, 6] }]
    });
  });

  test("with unresolved operand as dividend", () => {
    expect(evaluate({ "%": [{ someOperator: [5, 6] }, 10] })).toEqual({
      "%": [{ someOperator: [5, 6] }, 10]
    });
  });
});
