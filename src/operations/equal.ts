import { Operation } from "../types";
import { isPrefixExpression } from "../utils";

export const operator = "==";

const EqualOperation: Operation<typeof operator> = operands => {
  if (operands.length != 2) {
    throw new Error(`${operator} operator needs exactly 2 operands`);
  }

  if (isPrefixExpression(operands[0]) || isPrefixExpression(operands[1])) {
    return { [operator]: [...operands] };
  }

  return operands[0] == operands[1];
};

export default EqualOperation;
