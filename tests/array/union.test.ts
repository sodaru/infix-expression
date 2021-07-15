import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for union operation", () => {
  test("with zero operand", () => {
    expect(evaluate({ union: [] })).toEqual([]);
  });

  test("with one operand", () => {
    expect(evaluate({ union: [[10]] })).toEqual([10]);
  });

  test("with two operand", () => {
    expect(
      evaluate({
        union: [
          [10, 20, 30],
          [15, 20, 25, 30]
        ]
      })
    ).toEqual([10, 20, 30, 15, 25]);
  });

  test("with three operand", () => {
    expect(
      evaluate({
        union: [
          [10, 20, 30],
          [15, 20, 25, 30],
          [10, 20, 40]
        ]
      })
    ).toEqual([10, 20, 30, 15, 25, 40]);
  });

  test("with invalid 1st array", () => {
    expect(() =>
      evaluate({
        union: [{ a: 10, b: 20, c: 30 }, [30, 40, 10]]
      })
    ).toThrowError("Can not apply union Operation on operand at 0");
  });

  test("with invalid 2nd array", () => {
    expect(() =>
      evaluate({
        union: [[30, 40, 10], { a: 10, b: 20, c: 30 }]
      })
    ).toThrowError("Can not apply union Operation on operand at 1");
  });

  test("with array from data", () => {
    expect(
      evaluate(
        {
          union: [{ var: ["$.a"] }, [15, 20, 25, 30]]
        },
        { a: [10, 15, 30] }
      )
    ).toEqual([10, 15, 30, 20, 25]);
  });

  test("with unresolved array", () => {
    expect(
      evaluate({
        union: [[2, 4], { someOperator: [1, 2] }, [1, 2, 3]]
      })
    ).toEqual({
      union: [[2, 4, 1, 3], { someOperator: [1, 2] }]
    });
  });
});
