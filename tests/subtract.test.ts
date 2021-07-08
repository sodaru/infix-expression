import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for subtract operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "-": [] })).toThrowError(
      "atleast 1 operand is expected for operator -"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ "-": [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ "-": [10, 30] })).toEqual(-20);
  });

  test("with three operands", () => {
    expect(evaluate({ "-": [50, 30, 5] })).toEqual(15);
  });

  test("with negative operands", () => {
    expect(evaluate({ "-": [50, -30, 5] })).toEqual(75);
  });

  test("with number string", () => {
    expect(evaluate({ "-": ["50.5", 10, "30"] })).toEqual(10.5);
  });

  test("with boolean", () => {
    expect(evaluate({ "-": [10, true, "5.5", false] })).toEqual(3.5);
  });

  test("with null", () => {
    expect(evaluate({ "-": [10, null, "5.5"] })).toEqual(4.5);
  });

  test("with object", () => {
    expect(() =>
      evaluate({ "-": [10, true, null, "50.5", { a: "x" }] })
    ).toThrowError("Can not apply - Operation on operand at 4");
  });

  test("with object as first operand", () => {
    expect(() =>
      evaluate({ "-": [{ a: "x" }, true, null, "50.5"] })
    ).toThrowError("Can not apply - Operation on operand at 0");
  });

  test("with nested operation", () => {
    expect(evaluate({ "-": [10, true, null, "5.5", { "-": [6, 4] }] })).toEqual(
      1.5
    );
  });

  test("with unresolved operand", () => {
    expect(
      evaluate({ "-": [10, true, null, "50.5", { someOperator: [5, 6] }] })
    ).toEqual({ "-": [10, 51.5, { someOperator: [5, 6] }] });
  });
});
