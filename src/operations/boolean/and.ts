import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "&&";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<boolean[]> = {
  type: "array",
  items: [{ type: "boolean" }, { type: "boolean" }],
  minItems: 2,
  additionalItems: false
};

const AndOperation: Operation<typeof operator> = operands => {
  const _operands = operands as boolean[];
  return _operands[0] && _operands[1];
};

export default AndOperation;
