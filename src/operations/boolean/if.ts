import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "if";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<unknown[]> = {
  type: "array",
  items: [{ type: "boolean" }, true, true],
  minItems: 3,
  additionalItems: false
};

const IfOperation: Operation<typeof operator> = operands => {
  return operands[0] ? operands[1] : operands[2];
};

export default IfOperation;
