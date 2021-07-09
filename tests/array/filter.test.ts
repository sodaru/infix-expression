import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for filter operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ filter: [] })).toThrowError(
      "filter operator needs exactly 2 operands"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ filter: [10] })).toThrowError(
      "filter operator needs exactly 2 operands"
    );
  });

  test("with three operand", () => {
    expect(() => evaluate({ filter: [10, 20, 30] })).toThrowError(
      "filter operator needs exactly 2 operands"
    );
  });

  test("with valid operands", () => {
    expect(
      evaluate({
        filter: [[10, 20, 30], { callback: { "%": [{ var: ["$.item"] }, 3] } }]
      })
    ).toEqual([10, 20]);
  });

  test("with invalid array", () => {
    expect(() =>
      evaluate({
        filter: [
          { a: 10, b: 20, c: 30 },
          { callback: { "/": [{ var: ["$.item"] }, 10] } }
        ]
      })
    ).toThrowError("Can not apply filter Operation on operand at 0");
  });

  test("with array from data", () => {
    expect(
      evaluate(
        {
          filter: [
            { var: ["$.a"] },
            {
              callback: { "%": [{ var: ["$.item"] }, { var: ["$.parent.b"] }] }
            }
          ]
        },
        { a: [10, 15, 30], b: 3 }
      )
    ).toEqual([10]);
  });

  test("with unresolved array", () => {
    expect(
      evaluate({
        filter: [
          { someOperator: [1, 2] },
          { callback: { "/": [{ var: ["$.item"] }, 10] } }
        ]
      })
    ).toEqual({
      filter: [
        { someOperator: [1, 2] },
        { callback: { "/": [{ var: ["$.item"] }, 10] } }
      ]
    });
  });

  test("with invalid callback", () => {
    expect(() =>
      evaluate({
        filter: [
          [10, 20, 30],
          { notcallback: { "/": [{ var: ["$.item"] }, 10] } }
        ]
      })
    ).toThrowError("Can not apply / Operation on operand at 0");
  });

  test("with another invalid callback", () => {
    expect(() =>
      evaluate({
        filter: [[10, 20, 30], "not a callback"]
      })
    ).toThrowError("operand at 1 must be a callback for filter operator");
  });

  test("with string as callback expression", () => {
    expect(
      evaluate({
        filter: [[10, 20, 30], { callback: "let's see" }]
      })
    ).toEqual([10, 20, 30]);
  });

  test("with mimic callback operand", () => {
    expect(() =>
      evaluate({
        filter: [[10, 20, 30], { callback: "let's see", expression: "again" }]
      })
    ).toThrowError("callback.callback is not a function");
  });

  test("with mimic callback with more keys", () => {
    expect(() =>
      evaluate({
        filter: [[10, 20, 30], { callback: "let's see", isee: "again" }]
      })
    ).toThrowError("operand at 1 must be a callback for filter operator");
  });
});
