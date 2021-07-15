import { difference, isArray } from "lodash";
import { Operation, PrefixExpression } from "../../types";
import { isPrefixExpression } from "../../utils";

export const operator = "diff";

const DiffOperation: Operation<typeof operator> = operands => {
  if (operands.length == 0) {
    throw new Error(`atleast 1 operand is expected for operator ${operator}`);
  }

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

  if (unresolvedOperands.length > 0) {
    return {
      [operator]: [...operands]
    };
  } else {
    return difference(arrays[0], ...arrays.slice(1));
  }
};

export default DiffOperation;
