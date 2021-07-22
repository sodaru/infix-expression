import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for entries operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ entries: [] })).toThrowError(
      " must NOT have fewer than 1 items"
    );
  });

  test("with two operand", () => {
    expect(() => evaluate({ entries: [10, 20] })).toThrowError(
      " must NOT have more than 1 items"
    );
  });

  test("with valid object", () => {
    expect(evaluate({ entries: [{ x: 10, y: 20, z: 30 }] })).toEqual([
      ["x", 10],
      ["y", 20],
      ["z", 30]
    ]);
  });

  test("with string", () => {
    expect(() => evaluate({ entries: ["this is awesome"] })).toThrowError(
      "/0 must be object"
    );
  });

  test("with boolean", () => {
    expect(() => evaluate({ entries: [true] })).toThrowError(
      "/0 must be object"
    );
  });

  test("with unresolved operand", () => {
    expect(evaluate({ entries: [{ someoperator: [1, 2] }] })).toEqual({
      entries: [{ someoperator: [1, 2] }]
    });
  });
});
