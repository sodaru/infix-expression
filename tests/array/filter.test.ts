import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for filter operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ filter: [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ filter: [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with three operand", () => {
    expect(() => evaluate({ filter: [10, 20, 30] })).toThrowError(
      " must NOT have more than 2 items"
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
    ).toThrowError("/0 must be array");
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
        filter: [[10, 20, 30], { notcallback: "not a callback" }]
      })
    ).toThrowError("/1 must NOT have additional properties");
  });

  test("with another invalid callback", () => {
    expect(() =>
      evaluate({
        filter: [[10, 20, 30], "not a callback"]
      })
    ).toThrowError("/1 must be object");
  });

  test("with string as callback expression", () => {
    expect(
      evaluate({
        filter: [[10, 20, 30], { callback: "let's see" }]
      })
    ).toEqual([10, 20, 30]);
  });

  test("with more keys in callback operand", () => {
    expect(() =>
      evaluate({
        filter: [[10, 20, 30], { callback: "let's see", expression: "again" }]
      })
    ).toThrowError("/1 must NOT have additional properties");
  });
});
