import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for max operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ max: [] })).toThrowError(
      " must NOT have fewer than 1 items"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ max: [[2, 10, 5, 1]] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(() => evaluate({ max: [[10], [30]] })).toThrowError(
      " must NOT have more than 1 items"
    );
  });

  test("with three items", () => {
    expect(evaluate({ max: [[50, 30, 5]] })).toEqual(50);
  });

  test("with negative item", () => {
    expect(evaluate({ max: [[50, -30, 5]] })).toEqual(50);
  });

  test("with number string", () => {
    expect(evaluate({ max: [["50.5", 10, "30"]] })).toEqual(50.5);
  });

  test("with boolean", () => {
    expect(evaluate({ max: [[10, true, "5.5", false]] })).toEqual(10);
  });

  test("with null", () => {
    expect(evaluate({ max: [[10, null, "5.5"]] })).toEqual(10);
  });

  test("with object operand", () => {
    expect(() => evaluate({ max: [{ a: "x" }] })).toThrowError(
      "/0 must be array"
    );
  });

  test("with object item", () => {
    expect(() =>
      evaluate({ max: [[true, { a: "x" }, null, "50.5"]] })
    ).toThrowError("/1 must be number");
  });

  test("with nested operation", () => {
    expect(
      evaluate({ max: [[10, true, null, "5.5", { max: [[12, 4]] }]] })
    ).toEqual(12);
  });

  test("with unresolved item", () => {
    expect(() =>
      evaluate({ max: [[10, true, null, "50.5", { someOperator: [5, 6] }]] })
    ).toThrowError("/0/4 must be number");
  });

  test("with only unresolved operand", () => {
    expect(evaluate({ max: [{ someOperator: [5, 6] }] })).toEqual({
      max: [{ someOperator: [5, 6] }]
    });
  });
});
