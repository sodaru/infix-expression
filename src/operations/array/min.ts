import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "min";

export const schema: JSONSchemaType<number[][]> = {
  type: "array",
  items: {
    type: "array",
    items: {
      type: "number"
    }
  },
  minItems: 1,
  maxItems: 1
};

const MinOperation: Operation<typeof operator> = operands => {
  const numbers = operands[0] as number[];

  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }
  return min;
};

export default MinOperation;
