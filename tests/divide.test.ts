import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for divide operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ "/": [] })).toThrowError(
      "atleast 1 operand is expected for operator /"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ "/": [10] })).toEqual(10);
  });

  test("with two operands", () => {
    expect(evaluate({ "/": [10, 4] })).toEqual(2.5);
  });

  test("with three operands", () => {
    expect(evaluate({ "/": [50, 5, 2] })).toEqual(5);
  });

  test("with number string", () => {
    expect(evaluate({ "/": ["50.5", 10, "5"] })).toEqual(1.01);
  });

  test("with boolean", () => {
    expect(evaluate({ "/": [10, true, "2.5"] })).toEqual(4);
  });

  test("with null", () => {
    expect(evaluate({ "/": [10, null, "5.5"] })).toEqual(Infinity);
  });

  test("with object", () => {
    expect(() =>
      evaluate({ "/": [10, true, null, "50.5", { a: "x" }] })
    ).toThrowError("Can not apply / Operation on operand at 4");
  });

  test("with object as first operand", () => {
    expect(() =>
      evaluate({ "/": [{ a: "x" }, true, null, "50.5"] })
    ).toThrowError("Can not apply / Operation on operand at 0");
  });

  test("with nested operation", () => {
    expect(evaluate({ "/": [10, true, "2.5", { "/": [6, 3] }] })).toEqual(2);
  });

  test("with unresolved operand", () => {
    expect(
      evaluate({ "/": [10, true, "50.5", { someOperator: [5, 6] }] })
    ).toEqual({ "/": [10, 50.5, { someOperator: [5, 6] }] });
  });
});
