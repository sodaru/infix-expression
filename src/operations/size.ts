import { JSONSchemaType } from "ajv";
import { size } from "lodash";
import { Expression, Operation } from "../types";

export const operator = "size";

// @ts-expect-error JSONSchemType does not support positional schema in items
export const schema: JSONSchemaType<Expression[]> = {
  type: "array",
  items: [
    {
      oneOf: [
        {
          type: "array",
          items: true
        },
        { type: "string" }
      ]
    }
  ],
  minItems: 1,
  additionalItems: false
};

const SizeOperation: Operation<typeof operator> = operands => {
  const _collection = operands[0] as unknown[] | string;

  return size(_collection);
};

export default SizeOperation;
