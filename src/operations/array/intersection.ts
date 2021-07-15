import { intersection, isArray } from "lodash";
import { Operation, PrefixExpression } from "../../types";
import { isPrefixExpression } from "../../utils";

export const operator = "intersection";

const IntersectionOperation: Operation<typeof operator> = operands => {
  const arrays = [];
  const unresolvedOperands: PrefixExpression[] = [];
  operands.forEach((operand, i) => {
    if (isArray(operand)) {
      arrays.push(operand);
    } else if (isPrefixExpression(operand)) {
      unresolvedOperands.push(operand as PrefixExpression);
    } else {
      throw new Error(`Can not apply ${operator} Operation on operand at ${i}`);
    }
  });

  const result = arrays.length > 0 ? intersection(...arrays) : [];

  if (unresolvedOperands.length > 0) {
    return { [operator]: [result, ...unresolvedOperands] };
  } else {
    return result;
  }
};

export default IntersectionOperation;
