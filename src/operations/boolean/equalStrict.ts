import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "===";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<unknown[]> = {
  type: "array",
  items: [true, true],
  minItems: 2,
  additionalItems: false
};

const EqualStrictOperation: Operation<typeof operator> = operands => {
  return operands[0] === operands[1];
};

export default EqualStrictOperation;
