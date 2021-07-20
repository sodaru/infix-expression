import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for min operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ min: [] })).toThrowError(
      " must NOT have fewer than 1 items"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ min: [[20, 10, 34]] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(() => evaluate({ min: [[10], [30]] })).toThrowError(
      " must NOT have more than 1 items"
    );
  });

  test("with three items", () => {
    expect(evaluate({ min: [[50, 30, 5]] })).toEqual(5);
  });

  test("with negative item", () => {
    expect(evaluate({ min: [[50, -30, 5]] })).toEqual(-30);
  });

  test("with number string", () => {
    expect(evaluate({ min: [["50.5", 10, "30"]] })).toEqual(10);
  });

  test("with boolean", () => {
    expect(evaluate({ min: [[10, true, "5.5", false]] })).toEqual(0);
  });

  test("with null", () => {
    expect(evaluate({ min: [[10, null, "5.5"]] })).toEqual(0);
  });

  test("with object operand", () => {
    expect(() => evaluate({ min: [{ a: "x" }] })).toThrowError(
      "/0 must be array"
    );
  });

  test("with object item", () => {
    expect(() =>
      evaluate({ min: [[10, { a: "x" }, true, null, "50.5"]] })
    ).toThrowError("/1 must be number");
  });

  test("with nested operation", () => {
    expect(evaluate({ min: [[10, "5.5", { min: [[12, 4]] }]] })).toEqual(4);
  });

  test("with unresolved item", () => {
    expect(() =>
      evaluate({ min: [[10, "50.5", { someOperator: [5, 6] }]] })
    ).toThrowError("/0/2 must be number");
  });

  test("with only unresolved operand", () => {
    expect(evaluate({ min: [{ someOperator: [5, 6] }] })).toEqual({
      min: [{ someOperator: [5, 6] }]
    });
  });
});
