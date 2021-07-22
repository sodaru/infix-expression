import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for concat operation", () => {
  test("with zero operand", () => {
    expect(evaluate({ concat: [] })).toEqual("");
  });

  test("with one operand", () => {
    expect(evaluate({ concat: ["this"] })).toEqual("this");
  });

  test("with two operands", () => {
    expect(evaluate({ concat: ["this", " is"] })).toEqual("this is");
  });

  test("with three operands", () => {
    expect(evaluate({ concat: ["this", " is", " awesome"] })).toEqual(
      "this is awesome"
    );
  });

  test("with numeric operands", () => {
    expect(evaluate({ concat: [10, " is", " ten"] })).toEqual("10 is ten");
  });

  test("with boolean", () => {
    expect(evaluate({ concat: [true, " is", " true"] })).toEqual(
      "true is true"
    );
  });

  test("with null", () => {
    expect(evaluate({ concat: [null, " is", " null"] })).toEqual(" is null");
  });

  test("with object", () => {
    expect(() =>
      evaluate({ concat: ["this", " is", " awesome", { a: "x" }] })
    ).toThrowError("/3 must be string");
  });

  test("with nested operation", () => {
    expect(
      evaluate({ concat: ["this", { concat: [" is", " awesome"] }] })
    ).toEqual("this is awesome");
  });

  test("with unresolved operand", () => {
    expect(evaluate({ concat: ["this", { someOperator: [5, 6] }] })).toEqual({
      concat: ["this", { someOperator: [5, 6] }]
    });
  });
});
