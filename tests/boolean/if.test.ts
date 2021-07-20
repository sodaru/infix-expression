import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for if operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ if: [] })).toThrowError(
      " must NOT have fewer than 3 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ if: [10] })).toThrowError(
      " must NOT have fewer than 3 items"
    );
  });

  test("with two operands", () => {
    expect(() => evaluate({ if: [11, 3] })).toThrowError(
      " must NOT have fewer than 3 items"
    );
  });

  test("with three operands", () => {
    expect(evaluate({ if: [1, 30, 50] })).toEqual(30);
  });

  test("with negative", () => {
    expect(() => evaluate({ if: [-10, "A", "B"] })).toThrowError(
      "/0 must be boolean"
    );
  });

  test("with string", () => {
    expect(() => evaluate({ if: ["shhhhh", true, false] })).toThrowError(
      "/0 must be boolean"
    );
  });

  test("with empty string", () => {
    expect(() => evaluate({ if: ["", 33, 44] })).toThrowError(
      "/0 must be boolean"
    );
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
    expect(() => evaluate({ if: [{ a: "x" }, true, false] })).toThrowError(
      "/0 must be boolean"
    );
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
