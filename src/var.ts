import { isBoolean, isString } from "lodash";
import { Expression } from "./types";
import { query } from "jsonpath";
import { isPrefixExpression } from "./utils";

export const operator = "var";

type VarOperationType = (operands: Expression[], data: unknown) => Expression;

const VarOperation: VarOperationType = (operands, data) => {
  if (operands.length < 1 || operands.length > 2) {
    throw new Error(`${operator} operator needs either 1 or 2 operands`);
  }

  const isOperand1PrefixExpression = isPrefixExpression(operands[0]);
  const isOperand2PrefixExpression = isPrefixExpression(operands[1]);

  if (!isString(operands[0]) && !isOperand1PrefixExpression) {
    throw new Error(`1st operand for ${operator} operator must be a string`);
  }

  let all = false;
  if (operands.length == 2) {
    if (!isBoolean(operands[1]) && !isOperand2PrefixExpression) {
      throw new Error(`2nd operand for ${operator} operator must be a boolean`);
    }
    all = operands[1] as boolean;
  }

  if (isOperand1PrefixExpression || isOperand2PrefixExpression) {
    return { [operator]: [...operands] };
  }

  const result = query(data, operands[0] as string);
  return all ? result : result[0];
};

export default VarOperation;
