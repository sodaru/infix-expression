import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for multiply operation", () => {
  test("with zero operand", () => {
    expect(evaluate({ "*": [] })).toEqual(1);
  });

  test("with one operand", () => {
    expect(evaluate({ "*": [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ "*": [10, 30] })).toEqual(300);
  });

  test("with three operands", () => {
    expect(evaluate({ "*": [10, 30, 50] })).toEqual(15000);
  });

  test("with negative operands", () => {
    expect(evaluate({ "*": [10, -30, 50] })).toEqual(-15000);
  });

  test("with number string", () => {
    expect(evaluate({ "*": [10, "30", "50.5"] })).toEqual(15150);
  });

  test("with boolean", () => {
    expect(evaluate({ "*": [10, true, "50.5", false] })).toEqual(0);
  });

  test("with null", () => {
    expect(evaluate({ "*": [10, null, "50.5"] })).toEqual(0);
  });

  test("with object", () => {
    expect(() =>
      evaluate({ "*": [10, true, null, "50.5", { a: "x" }] })
    ).toThrowError("/4 must be number");
  });

  test("with nested operation", () => {
    expect(evaluate({ "*": [10, true, "50.5", { "*": [5, 6] }] })).toEqual(
      15150
    );
  });

  test("with unresolved operand", () => {
    expect(
      evaluate({ "*": [10, true, "50.5", { someOperator: [5, 6] }] })
    ).toEqual({ "*": [10, true, "50.5", { someOperator: [5, 6] }] });
  });
});
