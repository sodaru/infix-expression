import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for reduce operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ reduce: [] })).toThrowError(
      "reduce operator needs exactly 3 operands"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ reduce: [10] })).toThrowError(
      "reduce operator needs exactly 3 operands"
    );
  });

  test("with two operand", () => {
    expect(() => evaluate({ reduce: [10, 30] })).toThrowError(
      "reduce operator needs exactly 3 operands"
    );
  });

  test("with valid operands", () => {
    expect(
      evaluate({
        reduce: [
          [10, 20, 30],
          { callback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
          0
        ]
      })
    ).toEqual(60);
  });

  test("with invalid array", () => {
    expect(() =>
      evaluate({
        reduce: [
          { a: 10, b: 20, c: 30 },
          { callback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
          0
        ]
      })
    ).toThrowError("Can not apply reduce Operation on operand at 0");
  });

  test("with array from data", () => {
    expect(
      evaluate(
        {
          reduce: [
            { var: ["$.a"] },
            {
              callback: {
                "+": [
                  { var: ["$.prev"] },
                  { var: ["$.item"] },
                  { var: ["$.parent.b"] }
                ]
              }
            },
            { var: ["$.c"] }
          ]
        },
        { a: [10, 15, 30], b: 3, c: 10 }
      )
    ).toEqual(74);
  });

  test("with unresolved array", () => {
    expect(
      evaluate({
        reduce: [
          { someOperator: [1, 2] },
          { callback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
          0
        ]
      })
    ).toEqual({
      reduce: [
        { someOperator: [1, 2] },
        { callback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
        0
      ]
    });
  });

  test("with invalid callback", () => {
    expect(() =>
      evaluate({
        reduce: [
          [10, 20, 30],
          { notcallback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
          0
        ]
      })
    ).toThrowError("Can not apply + Operation on operand at 0");
  });

  test("with another invalid callback", () => {
    expect(() =>
      evaluate({
        reduce: [[10, 20, 30], "not a callback", 0]
      })
    ).toThrowError("operand at 1 must be a callback for reduce operator");
  });

  test("with string as callback expression", () => {
    expect(
      evaluate({
        reduce: [[10, 20, 30], { callback: "let's see" }, 0]
      })
    ).toEqual("let's see");
  });

  test("with mimic callback operand", () => {
    expect(() =>
      evaluate({
        reduce: [
          [10, 20, 30],
          { callback: "let's see", expression: "again" },
          0
        ]
      })
    ).toThrowError("callback.callback is not a function");
  });

  test("with mimic callback with more keys", () => {
    expect(() =>
      evaluate({
        reduce: [[10, 20, 30], { callback: "let's see", isee: "again" }, 0]
      })
    ).toThrowError("operand at 1 must be a callback for reduce operator");
  });

  test("with unresolved initial value", () => {
    expect(
      evaluate({
        reduce: [
          [10, 20, 30],
          { callback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
          { someOperator: [1, 2] }
        ]
      })
    ).toEqual({
      reduce: [
        [10, 20, 30],
        { callback: { "+": [{ var: ["$.prev"] }, { var: ["$.item"] }] } },
        { someOperator: [1, 2] }
      ]
    });
  });
});
