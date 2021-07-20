import { JSONSchemaType } from "ajv";
import { union } from "lodash";
import { Operation } from "../../types";

export const operator = "union";

// @ts-expect-error JSONSchemaType does not support true to items key
export const schema: JSONSchemaType<unknown[][]> = {
  type: "array",
  items: {
    type: "array",
    items: true
  },
  minItems: 0
};

const UnionOperation: Operation<typeof operator> = operands => {
  const arrays = operands as unknown[][];
  return union(...arrays);
};

export default UnionOperation;
