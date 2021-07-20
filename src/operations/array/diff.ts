import { JSONSchemaType } from "ajv";
import { difference } from "lodash";
import { Operation } from "../../types";

export const operator = "diff";

// @ts-expect-error JSONSchemaType does not support true to items key
export const schema: JSONSchemaType<unknown[][]> = {
  type: "array",
  items: {
    type: "array",
    items: true
  },
  minItems: 1
};

const DiffOperation: Operation<typeof operator> = operands => {
  const arrays = operands as unknown[][];
  return difference(arrays[0], ...arrays.slice(1));
};

export default DiffOperation;
