import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for equalStrict operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "===": [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ "===": [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with two operands", () => {
    expect(evaluate({ "===": [11, 3] })).toEqual(false);
  });

  test("with three operands", () => {
    expect(() => evaluate({ "===": [10, 30, 50] })).toThrowError(
      " must NOT have more than 2 items"
    );
  });

  test("with negative right", () => {
    expect(evaluate({ "===": [10, -3] })).toEqual(false);
  });

  test("with negative left", () => {
    expect(evaluate({ "===": [-10, 3] })).toEqual(false);
  });

  test("with number string", () => {
    expect(evaluate({ "===": [10, "10"] })).toEqual(false);
  });

  test("with boolean : true for right", () => {
    expect(evaluate({ "===": [1, true] })).toEqual(false);
  });

  test("with boolean : false for right", () => {
    expect(evaluate({ "===": [0, false] })).toEqual(false);
  });

  test("with boolean : true for left", () => {
    expect(evaluate({ "===": [true, 3] })).toEqual(false);
  });

  test("with boolean : false for left", () => {
    expect(evaluate({ "===": [false, 2] })).toEqual(false);
  });

  test("with null", () => {
    expect(evaluate({ "===": [0, null] })).toEqual(false);
  });

  test("with object as right", () => {
    expect(evaluate({ "===": [10, { a: "x" }] })).toEqual(false);
  });

  test("with object as left", () => {
    expect(evaluate({ "===": [{ a: "x" }, 2] })).toEqual(false);
  });

  test("with nested operation", () => {
    expect(evaluate({ "===": [true, { "===": [5, 5] }] })).toEqual(true);
  });

  test("with unresolved operand as right", () => {
    expect(evaluate({ "===": [10, { someOperator: [5, 6] }] })).toEqual({
      "===": [10, { someOperator: [5, 6] }]
    });
  });

  test("with unresolved operand as left", () => {
    expect(evaluate({ "===": [{ someOperator: [5, 6] }, 10] })).toEqual({
      "===": [{ someOperator: [5, 6] }, 10]
    });
  });
});
