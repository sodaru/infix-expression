import { Expression, Operation, PrefixExpression } from "../types";
import { isNaN, toNumber } from "lodash";
import { isPrefixExpression } from "../utils";

export const operator = "min";

const MinOperation: Operation<typeof operator> = operands => {
  if (operands.length == 0) {
    throw new Error(`atleast 1 operand is expected for operator ${operator}`);
  }

  const numbers: number[] = [];
  const unresolvedOperands: PrefixExpression[] = [];
  operands.forEach((operand, i) => {
    const number = toNumber(operand);
    if (!isNaN(number)) {
      numbers.push(number);
    } else if (isPrefixExpression(operand)) {
      unresolvedOperands.push(operand as PrefixExpression);
    } else {
      throw new Error(`Can not apply ${operator} Operation on operand at ${i}`);
    }
  });

  let min: number;
  if (numbers.length > 0) {
    min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i];
      }
    }
  }
  if (unresolvedOperands.length > 0) {
    const newOperands: Expression[] = unresolvedOperands;
    if (min !== undefined) {
      newOperands.push(min);
    }
    return { [operator]: newOperands };
  }
  return min;
};

export default MinOperation;
