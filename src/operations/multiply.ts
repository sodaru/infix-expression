import { Operation, PrefixExpression } from "../types";
import { isNaN, toNumber } from "lodash";
import { isPrefixExpression } from "../utils";

export const operator = "*";

const MultiplyOperation: Operation<typeof operator> = operands => {
  let product = 1;
  const unresolvedOperands: PrefixExpression[] = [];
  operands.forEach((operand, i) => {
    const number = toNumber(operand);
    if (!isNaN(number)) {
      product *= number;
    } else if (isPrefixExpression(operand)) {
      unresolvedOperands.push(operand as PrefixExpression);
    } else {
      throw new Error(`Can not apply ${operator} Operation on operand at ${i}`);
    }
  });
  if (unresolvedOperands.length == 0) {
    return product;
  } else {
    return { [operator]: [product, ...unresolvedOperands] };
  }
};

export default MultiplyOperation;
