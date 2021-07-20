import evaluate from "../../src/evaluate";

describe("Test Prefix Expression's evaluate for map operation", () => {
  test("with zero operand", () => {
    expect(() => evaluate({ map: [] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with one operand", () => {
    expect(() => evaluate({ map: [10] })).toThrowError(
      " must NOT have fewer than 2 items"
    );
  });

  test("with three operand", () => {
    expect(() => evaluate({ map: [10, 20, 30] })).toThrowError(
      " must NOT have more than 2 items"
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
    ).toThrowError("/0 must be array");
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
        map: [[10, 20, 30], { notcallback: "notcallback" }]
      })
    ).toThrowError("/1 must NOT have additional properties");
  });

  test("with another invalid callback", () => {
    expect(() =>
      evaluate({
        map: [[10, 20, 30], "not a callback"]
      })
    ).toThrowError("/1 must be object");
  });

  test("with string as callback expression", () => {
    expect(
      evaluate({
        map: [[10, 20, 30], { callback: "let's see" }]
      })
    ).toEqual(["let's see", "let's see", "let's see"]);
  });

  test("with more keys in callback operand", () => {
    expect(() =>
      evaluate({
        map: [[10, 20, 30], { callback: "let's see", expression: "again" }]
      })
    ).toThrowError("/1 must NOT have additional properties");
  });
});
