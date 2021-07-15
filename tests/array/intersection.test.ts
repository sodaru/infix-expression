import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for intersection operation", () => {
  test("with zero operand", () => {
    expect(evaluate({ intersection: [] })).toEqual([]);
  });

  test("with one operand", () => {
    expect(evaluate({ intersection: [[10]] })).toEqual([10]);
  });

  test("with two operand", () => {
    expect(
      evaluate({
        intersection: [
          [10, 20, 30],
          [15, 20, 25, 30]
        ]
      })
    ).toEqual([20, 30]);
  });

  test("with three operand", () => {
    expect(
      evaluate({
        intersection: [
          [10, 20, 30],
          [15, 20, 25, 30],
          [10, 20, 40]
        ]
      })
    ).toEqual([20]);
  });

  test("with invalid 1st array", () => {
    expect(() =>
      evaluate({
        intersection: [{ a: 10, b: 20, c: 30 }, [30, 40, 10]]
      })
    ).toThrowError("Can not apply intersection Operation on operand at 0");
  });

  test("with invalid 2nd array", () => {
    expect(() =>
      evaluate({
        intersection: [[30, 40, 10], { a: 10, b: 20, c: 30 }]
      })
    ).toThrowError("Can not apply intersection Operation on operand at 1");
  });

  test("with array from data", () => {
    expect(
      evaluate(
        {
          intersection: [{ var: ["$.a"] }, [15, 20, 25, 30]]
        },
        { a: [10, 15, 30] }
      )
    ).toEqual([15, 30]);
  });

  test("with unresolved array", () => {
    expect(
      evaluate({
        intersection: [[2, 4], { someOperator: [1, 2] }, [1, 2, 3]]
      })
    ).toEqual({
      intersection: [[2], { someOperator: [1, 2] }]
    });
  });
});
