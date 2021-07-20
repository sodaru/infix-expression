import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "!";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<unknown[]> = {
  type: "array",
  items: [{ type: "boolean" }],
  minItems: 1,
  additionalItems: false
};

const NotOperation: Operation<typeof operator> = operands => {
  return !operands[0];
};

export default NotOperation;
