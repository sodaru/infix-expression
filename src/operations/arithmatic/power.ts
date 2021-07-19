import { Operation } from "../../types";
import { JSONSchemaType } from "ajv";

export const operator = "pow";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<number[]> = {
  type: "array",
  items: [{ type: "number" }, { type: "number" }],
  minItems: 2,
  additionalItems: false
};

const PowerOperation: Operation<typeof operator> = operands => {
  const _operands = operands as number[];
  return Math.pow(_operands[0], _operands[1]);
};

export default PowerOperation;
