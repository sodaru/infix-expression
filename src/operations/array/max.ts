import { JSONSchemaType } from "ajv";
import { Operation } from "../../types";

export const operator = "max";

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

const MaxOperation: Operation<typeof operator> = operands => {
  const numbers = operands[0] as number[];

  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
};

export default MaxOperation;
