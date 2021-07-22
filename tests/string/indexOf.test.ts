import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for indexOf operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ indexOf: [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ indexOf: [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with three operand", () => {
    expect(() => evaluate({ indexOf: [10, 20, 30] })).toThrowError(
      " must NOT have more than 2 items"
    );
  });

  test("with valid operands", () => {
    expect(evaluate({ indexOf: ["this is awesome", "some"] })).toEqual(11);
  });

  test("with object as 1st operand", () => {
    expect(() => evaluate({ indexOf: [{ x: 10 }, "some"] })).toThrowError(
      "/0 must be string"
    );
  });

  test("with object as 2nd operand", () => {
    expect(() => evaluate({ indexOf: ["some", { x: 10 }] })).toThrowError(
      "/1 must be string"
    );
  });

  test("with unresolved 1st operand", () => {
    expect(evaluate({ indexOf: [{ someoperator: [1, 2] }, "some"] })).toEqual({
      indexOf: [{ someoperator: [1, 2] }, "some"]
    });
  });

  test("with unresolved 2nd operand", () => {
    expect(
      evaluate({ indexOf: [[1, 2, 3], { someoperator: [1, 2] }] })
    ).toEqual({ indexOf: [[1, 2, 3], { someoperator: [1, 2] }] });
  });
});
