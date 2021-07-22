import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for includes operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ includes: [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ includes: [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with three operand", () => {
    expect(() => evaluate({ includes: [10, 20, 30] })).toThrowError(
      " must NOT have more than 2 items"
    );
  });

  test("with valid operands expecting true", () => {
    expect(evaluate({ includes: [[10, 20, 30], 30] })).toEqual(true);
  });

  test("with valid operands expecting false", () => {
    expect(evaluate({ includes: [[10, 20, 30], 40] })).toEqual(false);
  });

  test("with object array expecting true", () => {
    expect(
      evaluate({ includes: [[{ x: 10 }, { y: 20 }, { z: 30 }], { x: 10 }] })
    ).toEqual(true);
  });
  test("with object array expecting false", () => {
    expect(
      evaluate({ includes: [[{ x: 10 }, { y: 20 }, { z: 30 }], { x: 20 }] })
    ).toEqual(false);
  });

  test("with unresolved 1st operand", () => {
    expect(
      evaluate({ includes: [{ someoperator: [1, 2] }, { x: 20 }] })
    ).toEqual({ includes: [{ someoperator: [1, 2] }, { x: 20 }] });
  });

  test("with unresolved 2nd operand", () => {
    expect(
      evaluate({ includes: [[1, 2, 3], { someoperator: [1, 2] }] })
    ).toEqual({ includes: [[1, 2, 3], { someoperator: [1, 2] }] });
  });
});
