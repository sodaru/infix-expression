import { Operation } from "../../types";
import { isPrefixExpression } from "../../utils";

export const operator = "if";

const IfOperation: Operation<typeof operator> = operands => {
  if (operands.length != 3) {
    throw new Error(`${operator} operator needs exactly 3 operands`);
  }

  if (isPrefixExpression(operands[0])) {
    return { [operator]: [...operands] };
  }

  return operands[0] ? operands[1] : operands[2];
};

export default IfOperation;
