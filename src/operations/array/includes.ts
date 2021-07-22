import { JSONSchemaType } from "ajv";
import { find, isEqual } from "lodash";
import { Expression, Operation } from "../../types";

export const operator = "includes";

// @ts-expect-error JSONSchemaType does not support array of schemas in items
export const schema: JSONSchemaType<Expression[]> = {
  type: "array",
  items: [{ type: "array", items: true }, true],
  minItems: 2,
  additionalItems: false
};

const IncludesOperation: Operation<typeof operator> = operands => {
  const _array = operands[0] as unknown[];
  const _target = operands[1] as unknown;

  return find(_array, o => isEqual(o, _target)) !== undefined;
};

export default IncludesOperation;
