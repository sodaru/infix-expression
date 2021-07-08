import { Operation, PrefixExpression } from "../types";
import { isNaN, toNumber } from "lodash";
import { isPrefixExpression } from "../utils";

export const operator = "/";

const DivideOperation: Operation<typeof operator> = operands => {
  if (operands.length == 0) {
    throw new Error(`atleast 1 operand is expected for operator ${operator}`);
  }

  let totalDivisor = 1;
  const unresolvedOperands: PrefixExpression[] = [];
  operands.forEach((operand, i) => {
    if (i === 0) {
      return;
    }
    const number = toNumber(operand);
    if (!isNaN(number)) {
      totalDivisor *= number;
    } else if (isPrefixExpression(operand)) {
      unresolvedOperands.push(operand as PrefixExpression);
    } else {
      throw new Error(`Can not apply ${operator} Operation on operand at ${i}`);
    }
  });

  const firstNumber = toNumber(operands[0]);
  if (isNaN(firstNumber) && !isPrefixExpression(operands[0])) {
    throw new Error(`Can not apply ${operator} Operation on operand at 0`);
  }

  if (isPrefixExpression(operands[0]) || unresolvedOperands.length > 0) {
    return {
      [operator]: [operands[0], totalDivisor, ...unresolvedOperands]
    };
  }

  return firstNumber / totalDivisor;
};

export default DivideOperation;
