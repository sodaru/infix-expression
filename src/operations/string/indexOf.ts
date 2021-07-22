import { JSONSchemaType } from "ajv";
import { Expression, Operation } from "../../types";

export const operator = "indexOf";

export const schema: JSONSchemaType<Expression[]> = {
  type: "array",
  items: { type: "string" },
  minItems: 2,
  maxItems: 2
};

const IndexOfOperation: Operation<typeof operator> = operands => {
  const _str = operands[0] as string;
  const _subStr = operands[1] as string;

  return _str.indexOf(_subStr);
};

export default IndexOfOperation;
