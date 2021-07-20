import { JSONSchemaType } from "ajv";
import { CallbackFunction, Expression, Operation } from "../../types";

export const operator = "map";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<Expression[]> = {
  type: "array",
  items: [
    { type: "array", items: { type: "number" } },
    {
      type: "object",
      properties: { callback: true },
      additionalProperties: false
    }
  ],
  minItems: 2,
  additionalItems: false
};

const MapOperation: Operation<typeof operator> = operands => {
  const _array = operands[0] as unknown[];
  const _callback = operands[1] as { callback: CallbackFunction };

  return _array.map((item, i) => {
    return _callback.callback({ item, i });
  });
};

export default MapOperation;
