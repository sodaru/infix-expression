import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for reduce operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ reduce: [] })).toThrowError(
      " must NOT have fewer than 3 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ reduce: [10] })).toThrowError(
      " must NOT have fewer than 3 items"
    );
  });

  test("with two operand", () => {
    expect(() => evaluate({ reduce: [10, 30] })).toThrowError(
      " must NOT have fewer than 3 items"
    );
  });

  test("with four operand", () => {
    expect(() => evaluate({ reduce: [10, 30, 40, 60] })).toThrowError(
      " must NOT have more than 3 items"
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
    ).toThrowError("/0 must be array");
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
        reduce: [[10, 20, 30], { notcallback: "notcallback" }, 0]
      })
    ).toThrowError("/1 must NOT have additional properties");
  });

  test("with another invalid callback", () => {
    expect(() =>
      evaluate({
        reduce: [[10, 20, 30], "not a callback", 0]
      })
    ).toThrowError("/1 must be object");
  });

  test("with string as callback expression", () => {
    expect(
      evaluate({
        reduce: [[10, 20, 30], { callback: "let's see" }, 0]
      })
    ).toEqual("let's see");
  });

  test("with more keys in callback operand", () => {
    expect(() =>
      evaluate({
        reduce: [
          [10, 20, 30],
          { callback: "let's see", expression: "again" },
          0
        ]
      })
    ).toThrowError("/1 must NOT have additional properties");
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
