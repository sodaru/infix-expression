import evaluate from "../src/evaluate";

describe("Test Prefix Expression's evaluate for var operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ var: [] })).toThrowError(
      "var operator needs either 1 or 2 operands"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ var: ["$"] })).toEqual({});
  });

  test("with one unresollved operand", () => {
    expect(evaluate({ var: [{ someoperator: [1, 2] }] })).toEqual({
      var: [{ someoperator: [1, 2] }]
    });
  });

  test("with two operands", () => {
    expect(evaluate({ var: ["$", true] })).toEqual([{}]);
  });

  test("with 2nd unresollved operand", () => {
    expect(evaluate({ var: ["$", { someoperator: [1, 2] }] })).toEqual({
      var: ["$", { someoperator: [1, 2] }]
    });
  });

  test("with invalid 2nd operand", () => {
    expect(() => evaluate({ var: ["$", [34, 56]] })).toThrowError(
      "2nd operand for var operator must be a boolean"
    );
  });

  test("with both unresollved operands", () => {
    expect(
      evaluate({ var: [{ someoperator: [10, 2] }, { someoperator: [1, 2] }] })
    ).toEqual({
      var: [{ someoperator: [10, 2] }, { someoperator: [1, 2] }]
    });
  });

  test("with valid jsonpath", () => {
    expect(evaluate({ var: ["$.a"] }, { a: 20 })).toEqual(20);
  });

  test("with non existing jsonpath", () => {
    expect(evaluate({ var: ["$.b"] }, { a: 20 })).toEqual(undefined);
  });

  test("with invalid jsonpath", () => {
    expect(evaluate({ var: ["shhhh"] }, { a: 20 })).toEqual(undefined);
  });

  test("with another invalid jsonpath", () => {
    expect(() => evaluate({ var: [23] }, { a: 20 })).toThrowError(
      "1st operand for var operator must be a string"
    );
  });
});
