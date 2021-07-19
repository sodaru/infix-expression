import { Operation } from "../../types";
import { JSONSchemaType } from "ajv";

export const operator = "<";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<number[]> = {
  type: "array",
  items: [{ type: "number" }, { type: "number" }],
  minItems: 2,
  additionalItems: false
};

const LessThanOperation: Operation<typeof operator> = operands => {
  const _operands = operands as number[];
  return _operands[0] < _operands[1];
};

export default LessThanOperation;
