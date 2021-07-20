import { JSONSchemaType } from "ajv";
import { CallbackFunction, Expression, Operation } from "../../types";

export const operator = "reduce";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<Expression[]> = {
  type: "array",
  items: [
    { type: "array", items: { type: "number" } },
    {
      type: "object",
      properties: { callback: true },
      additionalProperties: false
    },
    true
  ],
  minItems: 3,
  additionalItems: false
};

const ReduceOperation: Operation<typeof operator> = operands => {
  const _array = operands[0] as unknown[];
  const _callback = operands[1] as { callback: CallbackFunction };
  const _initialValue = operands[2];

  return _array.reduce((prev, item, i) => {
    return _callback.callback({ prev, item, i });
  }, _initialValue) as Expression;
};

export default ReduceOperation;
