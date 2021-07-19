import { JSONSchemaType } from "ajv";
import { toNumber } from "lodash";
import { Operation } from "../../types";

export const operator = "*";

export const schema: JSONSchemaType<number[]> = {
  type: "array",
  items: {
    type: "number"
  },
  minItems: 0
};

const MultiplyOperation: Operation<typeof operator> = operands => {
  let product = 1;
  operands.forEach((operand: number) => {
    product *= toNumber(operand);
  });
  return product;
};

export default MultiplyOperation;
