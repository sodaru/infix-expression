import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for power operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ pow: [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ pow: [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with two operands", () => {
    expect(evaluate({ pow: [10, 3] })).toEqual(1000);
  });

  test("with three operands", () => {
    expect(() => evaluate({ pow: [10, 30, 50] })).toThrowError(
      " must NOT have more than 2 items"
    );
  });

  test("with negative exponent", () => {
    expect(evaluate({ pow: [10, -2] })).toEqual(0.01);
  });

  test("with negative base", () => {
    expect(evaluate({ pow: [-10, 3] })).toEqual(-1000);
  });

  test("with number string", () => {
    expect(evaluate({ pow: [10, "3"] })).toEqual(1000);
  });

  test("with boolean : true for exponent", () => {
    expect(evaluate({ pow: [10, true] })).toEqual(10);
  });

  test("with boolean : false for exponent", () => {
    expect(evaluate({ pow: [10, false] })).toEqual(1);
  });

  test("with boolean : true for base", () => {
    expect(evaluate({ pow: [true, 2] })).toEqual(1);
  });

  test("with boolean : false for base", () => {
    expect(evaluate({ pow: [false, 2] })).toEqual(0);
  });

  test("with null", () => {
    expect(evaluate({ pow: [10, null] })).toEqual(1);
  });

  test("with object as exponent", () => {
    expect(() => evaluate({ pow: [10, { a: "x" }] })).toThrowError(
      "/1 must be number"
    );
  });

  test("with object as base", () => {
    expect(() => evaluate({ pow: [{ a: "x" }, 2] })).toThrowError(
      "/0 must be number"
    );
  });

  test("with nested operation", () => {
    expect(evaluate({ pow: [10, { pow: [2, 2] }] })).toEqual(10000);
  });

  test("with unresolved operand as exponent", () => {
    expect(evaluate({ pow: [10, { someOperator: [5, 6] }] })).toEqual({
      pow: [10, { someOperator: [5, 6] }]
    });
  });

  test("with unresolved operand as base", () => {
    expect(evaluate({ pow: [{ someOperator: [5, 6] }, 10] })).toEqual({
      pow: [{ someOperator: [5, 6] }, 10]
    });
  });
});
