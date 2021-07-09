import { Operation } from "../../types";
import { isNaN, toNumber } from "lodash";
import { isPrefixExpression } from "../../utils";

export const operator = ">";

const GreaterThanOperation: Operation<typeof operator> = operands => {
  if (operands.length != 2) {
    throw new Error(`${operator} operator needs exactly 2 operands`);
  }

  const firstNumber = toNumber(operands[0]);
  const secondNumber = toNumber(operands[1]);

  if (isNaN(firstNumber) && !isPrefixExpression(operands[0])) {
    throw new Error(`Can not apply ${operator} Operation on operand at 0`);
  }

  if (isNaN(secondNumber) && !isPrefixExpression(operands[1])) {
    throw new Error(`Can not apply ${operator} Operation on operand at 1`);
  }

  if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
    return firstNumber > secondNumber;
  } else {
    return { [operator]: [...operands] };
  }
};

export default GreaterThanOperation;
