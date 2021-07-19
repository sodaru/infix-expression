import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "/";

export const schema: JSONSchemaType<number[]> = {
  type: "array",
  items: {
    type: "number"
  },
  minItems: 1
};

const DivideOperation: Operation<typeof operator> = operands => {
  const _operands = operands as number[];
  let totalDivisor = 1;
  for (let i = 1; i < _operands.length; i++) {
    totalDivisor *= _operands[i];
  }
  return _operands[0] / totalDivisor;
};

export default DivideOperation;
