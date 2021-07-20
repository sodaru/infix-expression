import { JSONSchemaType } from "ajv";
import { intersection } from "lodash";
import { Operation } from "../../types";

export const operator = "intersection";

// @ts-expect-error JSONSchemaType does not support true to items key
export const schema: JSONSchemaType<unknown[][]> = {
  type: "array",
  items: {
    type: "array",
    items: true
  },
  minItems: 0
};

const IntersectionOperation: Operation<typeof operator> = operands => {
  const arrays = operands as unknown[][];
  return intersection(...arrays);
};

export default IntersectionOperation;
