import { Operation, PrefixExpression } from "../../types";
import { isNaN, toNumber } from "lodash";
import { isPrefixExpression } from "../../utils";

export const operator = "+";

const AddOperation: Operation<typeof operator> = operands => {
  let sum = 0;
  const unresolvedOperands: PrefixExpression[] = [];
  operands.forEach((operand, i) => {
    const number = toNumber(operand);
    if (!isNaN(number)) {
      sum += number;
    } else if (isPrefixExpression(operand)) {
      unresolvedOperands.push(operand as PrefixExpression);
    } else {
      throw new Error(`Can not apply ${operator} Operation on operand at ${i}`);
    }
  });
  if (unresolvedOperands.length == 0) {
    return sum;
  } else {
    return { [operator]: [sum, ...unresolvedOperands] };
  }
};

export default AddOperation;
