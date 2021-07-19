import { Expression, Operation, PrefixExpression } from "../../types";
import { isNaN, toNumber } from "lodash";
import { isPrefixExpression } from "../../utils";

export const operator = "max";

const MaxOperation: Operation<typeof operator> = operands => {
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

  let max: number;
  if (numbers.length > 0) {
    max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }
  }
  if (unresolvedOperands.length > 0) {
    const newOperands: Expression[] = unresolvedOperands;
    if (max !== undefined) {
      newOperands.push(max);
    }
    return { [operator]: newOperands };
  }
  return max;
};

export default MaxOperation;
