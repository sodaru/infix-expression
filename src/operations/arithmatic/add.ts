import { JSONSchemaType } from "ajv";
import { toNumber } from "lodash";
import { Operation } from "../../types";

export const operator = "+";

export const schema: JSONSchemaType<number[]> = {
  type: "array",
  items: {
    type: "number"
  },
  minItems: 0
};

const AddOperation: Operation<typeof operator> = operands => {
  let sum = 0;
  operands.forEach((operand: number) => {
    sum += toNumber(operand);
  });
  return sum;
};

export default AddOperation;
