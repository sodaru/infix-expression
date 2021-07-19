import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for and operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "&&": [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ "&&": [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with two operands", () => {
    expect(evaluate({ "&&": [true, false] })).toEqual(false);
  });

  test("with three operands", () => {
    expect(() => evaluate({ "&&": [10, 30, 50] })).toThrowError(
      " must NOT have more than 2 items"
    );
  });

  test("with negative right", () => {
    expect(() => evaluate({ "&&": [false, -3] })).toThrowError(
      "/1 must be boolean"
    );
  });

  test("with negative left", () => {
    expect(() => evaluate({ "&&": [-10, true] })).toThrowError(
      "/0 must be boolean"
    );
  });

  test("with string", () => {
    expect(() => evaluate({ "&&": ["shhhh", false] })).toThrowError(
      "/0 must be boolean"
    );
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
    expect(() => evaluate({ "&&": [false, { a: "x" }] })).toThrowError(
      "/1 must be boolean"
    );
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
