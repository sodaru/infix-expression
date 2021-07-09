import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for var operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ map: [] })).toThrowError(
      "map operator needs exactly 2 operands"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ map: [10] })).toThrowError(
      "map operator needs exactly 2 operands"
    );
  });

  test("with three operand", () => {
    expect(() => evaluate({ map: [10, 20, 30] })).toThrowError(
      "map operator needs exactly 2 operands"
    );
  });

  test("with valid operands", () => {
    expect(
      evaluate({
        map: [[10, 20, 30], { callback: { "/": [{ var: ["$.item"] }, 10] } }]
      })
    ).toEqual([1, 2, 3]);
  });

  test("with invalid array", () => {
    expect(() =>
      evaluate({
        map: [
          { a: 10, b: 20, c: 30 },
          { callback: { "/": [{ var: ["$.item"] }, 10] } }
        ]
      })
    ).toThrowError("Can not apply map Operation on operand at 0");
  });

  test("with array from data", () => {
    expect(
      evaluate(
        {
          map: [
            { var: ["$.a"] },
            {
              callback: { "/": [{ var: ["$.item"] }, { var: ["$.parent.b"] }] }
            }
          ]
        },
        { a: [10, 20, 30], b: 5 }
      )
    ).toEqual([2, 4, 6]);
  });

  test("with unresolved array", () => {
    expect(
      evaluate({
        map: [
          { someOperator: [1, 2] },
          { callback: { "/": [{ var: ["$.item"] }, 10] } }
        ]
      })
    ).toEqual({
      map: [
        { someOperator: [1, 2] },
        { callback: { "/": [{ var: ["$.item"] }, 10] } }
      ]
    });
  });

  test("with invalid callback", () => {
    expect(() =>
      evaluate({
        map: [[10, 20, 30], { notcallback: { "/": [{ var: ["$.item"] }, 10] } }]
      })
    ).toThrowError("Can not apply / Operation on operand at 0");
  });

  test("with another invalid callback", () => {
    expect(() =>
      evaluate({
        map: [[10, 20, 30], "not a callback"]
      })
    ).toThrowError("operand at 1 must be a callback");
  });

  test("with string as callback expression", () => {
    expect(
      evaluate({
        map: [[10, 20, 30], { callback: "let's see" }]
      })
    ).toEqual(["let's see", "let's see", "let's see"]);
  });

  test("with mimic callback operand", () => {
    expect(() =>
      evaluate({
        map: [[10, 20, 30], { callback: "let's see", expression: "again" }]
      })
    ).toThrowError("callback.callback is not a function");
  });

  test("with mimic callback with more keys", () => {
    expect(() =>
      evaluate({
        map: [[10, 20, 30], { callback: "let's see", isee: "again" }]
      })
    ).toThrowError("operand at 1 must be a callback");
  });
});
