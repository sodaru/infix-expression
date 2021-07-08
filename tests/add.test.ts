import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for add operation", () => {
  test("with zero operand", () => {
    expect(evaluate({ "+": [] })).toEqual(0);
  });

  test("with one operand", () => {
    expect(evaluate({ "+": [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ "+": [10, 30] })).toEqual(40);
  });

  test("with three operands", () => {
    expect(evaluate({ "+": [10, 30, 50] })).toEqual(90);
  });

  test("with negative operands", () => {
    expect(evaluate({ "+": [10, -30, 50] })).toEqual(30);
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

  test("with unresolved operand", () => {
    expect(
      evaluate({ "+": [10, true, null, "50.5", { someOperator: [5, 6] }] })
    ).toEqual({ "+": [61.5, { someOperator: [5, 6] }] });
  });
});
