import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for min operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ min: [] })).toThrowError(
      "atleast 1 operand is expected for operator min"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ min: [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ min: [10, 30] })).toEqual(10);
  });

  test("with three operands", () => {
    expect(evaluate({ min: [50, 30, 5] })).toEqual(5);
  });

  test("with negative operands", () => {
    expect(evaluate({ min: [50, -30, 5] })).toEqual(-30);
  });

  test("with number string", () => {
    expect(evaluate({ min: ["50.5", 10, "30"] })).toEqual(10);
  });

  test("with boolean", () => {
    expect(evaluate({ min: [10, true, "5.5", false] })).toEqual(0);
  });

  test("with null", () => {
    expect(evaluate({ min: [10, null, "5.5"] })).toEqual(0);
  });

  test("with object", () => {
    expect(() =>
      evaluate({ min: [10, true, null, "50.5", { a: "x" }] })
    ).toThrowError("Can not apply min Operation on operand at 4");
  });

  test("with object as first operand", () => {
    expect(() =>
      evaluate({ min: [{ a: "x" }, true, null, "50.5"] })
    ).toThrowError("Can not apply min Operation on operand at 0");
  });

  test("with nested operation", () => {
    expect(evaluate({ min: [10, "5.5", { min: [12, 4] }] })).toEqual(4);
  });

  test("with unresolved operand", () => {
    expect(evaluate({ min: [10, "50.5", { someOperator: [5, 6] }] })).toEqual({
      min: [{ someOperator: [5, 6] }, 10]
    });
  });

  test("with only unresolved operand", () => {
    expect(evaluate({ min: [{ someOperator: [5, 6] }] })).toEqual({
      min: [{ someOperator: [5, 6] }]
    });
  });
});
