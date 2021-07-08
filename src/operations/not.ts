import { Operation } from "../types";
import { isPrefixExpression } from "../utils";

export const operator = "!";

const NotOperation: Operation<typeof operator> = operands => {
  if (operands.length != 1) {
    throw new Error(`${operator} operator needs exactly 1 operand`);
  }

  if (isPrefixExpression(operands[0])) {
    return { [operator]: [...operands] };
  }

  return !operands[0];
};

export default NotOperation;
