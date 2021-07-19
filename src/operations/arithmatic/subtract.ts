import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "-";

export const schema: JSONSchemaType<number[]> = {
  type: "array",
  items: {
    type: "number"
  },
  minItems: 1
};

const SubtractOperation: Operation<typeof operator> = operands => {
  const _operands = operands as number[];
  let totalSubtraction = 0;
  for (let i = 1; i < _operands.length; i++) {
    totalSubtraction += _operands[i];
  }
  return _operands[0] - totalSubtraction;
};

export default SubtractOperation;
