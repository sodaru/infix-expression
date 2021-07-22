import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for size operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ size: [] })).toThrowError(
      " must NOT have fewer than 1 items"
    );
  });

  test("with two operand", () => {
    expect(() => evaluate({ size: [10, 20] })).toThrowError(
      " must NOT have more than 1 items"
    );
  });

  test("with valid array", () => {
    expect(evaluate({ size: [[10, 20, 30]] })).toEqual(3);
  });

  test("with valid string", () => {
    expect(evaluate({ size: ["this is awesome"] })).toEqual(15);
  });

  test("with boolean", () => {
    expect(evaluate({ size: [true] })).toEqual(0);
  });

  test("with object", () => {
    expect(() => evaluate({ size: [{ a: 10 }] })).toThrowError(
      "/0 must be array, /0 must be string, /0 must match exactly one schema in oneOf"
    );
  });
});
