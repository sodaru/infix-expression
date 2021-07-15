import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for diff operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ diff: [] })).toThrowError(
      "atleast 1 operand is expected for operator diff"
    );
  });

  test("with one operand", () => {
    expect(evaluate({ diff: [[10]] })).toEqual([10]);
  });

  test("with two operand", () => {
    expect(
      evaluate({
        diff: [
          [10, 20, 30],
          [15, 20, 25, 30]
        ]
      })
    ).toEqual([10]);
  });

  test("with three operand", () => {
    expect(
      evaluate({
        diff: [
          [10, 20, 30],
          [15, 20, 25],
          [10, 20, 40]
        ]
      })
    ).toEqual([30]);
  });

  test("with invalid 1st array", () => {
    expect(() =>
      evaluate({
        diff: [{ a: 10, b: 20, c: 30 }, [30, 40, 10]]
      })
    ).toThrowError("Can not apply diff Operation on operand at 0");
  });

  test("with invalid 2nd array", () => {
    expect(() =>
      evaluate({
        diff: [[30, 40, 10], { a: 10, b: 20, c: 30 }]
      })
    ).toThrowError("Can not apply diff Operation on operand at 1");
  });

  test("with array from data", () => {
    expect(
      evaluate(
        {
          diff: [{ var: ["$.a"] }, [15, 20, 25, 30]]
        },
        { a: [10, 15, 30] }
      )
    ).toEqual([10]);
  });

  test("with unresolved array", () => {
    expect(
      evaluate({
        diff: [[2, 4], { someOperator: [1, 2] }, [1, 2, 3]]
      })
    ).toEqual({
      diff: [[2, 4], { someOperator: [1, 2] }, [1, 2, 3]]
    });
  });
});
