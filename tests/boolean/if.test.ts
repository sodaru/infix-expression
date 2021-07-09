import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for if operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ if: [] })).toThrowError(
      "if operator needs exactly 3 operands"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ if: [10] })).toThrowError(
      "if operator needs exactly 3 operands"
    );
  });

  test("with two operands", () => {
    expect(() => evaluate({ if: [11, 3] })).toThrowError(
      "if operator needs exactly 3 operands"
    );
  });

  test("with three operands", () => {
    expect(evaluate({ if: [10, 30, 50] })).toEqual(30);
  });

  test("with negative", () => {
    expect(evaluate({ if: [-10, "A", "B"] })).toEqual("A");
  });

  test("with string", () => {
    expect(evaluate({ if: ["shhhhh", true, false] })).toEqual(true);
  });

  test("with empty string", () => {
    expect(evaluate({ if: ["", 33, 44] })).toEqual(44);
  });

  test("with boolean true ", () => {
    expect(evaluate({ if: [true, { a: 10 }, { b: 20 }] })).toEqual({ a: 10 });
  });

  test("with boolean false", () => {
    expect(evaluate({ if: [false, { a: 10 }, { b: 20 }] })).toEqual({ b: 20 });
  });

  test("with null", () => {
    expect(evaluate({ if: [null, { a: 10 }, { b: 20 }] })).toEqual({ b: 20 });
  });

  test("with object", () => {
    expect(evaluate({ if: [{ a: "x" }, true, false] })).toEqual(true);
  });

  test("with nested operation", () => {
    expect(
      evaluate({ if: [{ if: [true, true, false] }, true, false] })
    ).toEqual(true);
  });

  test("with unresolved operand", () => {
    expect(evaluate({ if: [{ someOperator: [5, 6] }, true, false] })).toEqual({
      if: [{ someOperator: [5, 6] }, true, false]
    });
  });
});
