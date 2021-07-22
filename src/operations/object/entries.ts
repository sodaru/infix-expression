import { JSONSchemaType } from "ajv";
import { Expression, Operation } from "../../types";

export const operator = "entries";

export const schema: JSONSchemaType<Expression[]> = {
  type: "array",
  items: {
    type: "object"
  },
  minItems: 1,
  maxItems: 1
};

const EntriesOperation: Operation<typeof operator> = operands => {
  const _object = operands[0] as Record<string, unknown>;

  return Object.entries(_object);
};

export default EntriesOperation;
