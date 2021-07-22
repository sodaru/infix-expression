import { JSONSchemaType } from "ajv";
import { toString } from "lodash";
import { Operation } from "../../types";

export const operator = "concat";

export const schema: JSONSchemaType<string[]> = {
  type: "array",
  items: {
    type: "string"
  },
  minItems: 0
};

const ConcatOperation: Operation<typeof operator> = operands => {
  let result = "";
  operands.forEach((operand: number) => {
    result += toString(operand);
  });
  return result;
};

export default ConcatOperation;
