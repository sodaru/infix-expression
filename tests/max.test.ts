import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for max operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ max: [] })).toThrowError(
      "atleast 1 operand is expected for operator max"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ max: [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ max: [10, 30] })).toEqual(30);
  });

  test("with three operands", () => {
    expect(evaluate({ max: [50, 30, 5] })).toEqual(50);
  });

  test("with negative operands", () => {
    expect(evaluate({ max: [50, -30, 5] })).toEqual(50);
  });

  test("with number string", () => {
    expect(evaluate({ max: ["50.5", 10, "30"] })).toEqual(50.5);
  });

  test("with boolean", () => {
    expect(evaluate({ max: [10, true, "5.5", false] })).toEqual(10);
  });

  test("with null", () => {
    expect(evaluate({ max: [10, null, "5.5"] })).toEqual(10);
  });

  test("with object", () => {
    expect(() =>
      evaluate({ max: [10, true, null, "50.5", { a: "x" }] })
    ).toThrowError("Can not apply max Operation on operand at 4");
  });

  test("with object as first operand", () => {
    expect(() =>
      evaluate({ max: [{ a: "x" }, true, null, "50.5"] })
    ).toThrowError("Can not apply max Operation on operand at 0");
  });

  test("with nested operation", () => {
    expect(
      evaluate({ max: [10, true, null, "5.5", { max: [12, 4] }] })
    ).toEqual(12);
  });

  test("with unresolved operand", () => {
    expect(
      evaluate({ max: [10, true, null, "50.5", { someOperator: [5, 6] }] })
    ).toEqual({ max: [{ someOperator: [5, 6] }, 50.5] });
  });

  test("with only unresolved operand", () => {
    expect(evaluate({ max: [{ someOperator: [5, 6] }] })).toEqual({
      max: [{ someOperator: [5, 6] }]
    });
  });
});
