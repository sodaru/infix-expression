import { isArray, isPlainObject } from "lodash";
import { Expression } from "./types";

export const isPrefixExpression = (operand: Expression): boolean => {
  let isPrefixExpression = false;
  if (isPlainObject(operand) && Object.keys(operand).length == 1) {
    const operator = Object.keys(operand)[0];
    if (isArray(operand[operator])) {
      isPrefixExpression = true;
    }
  }
  return isPrefixExpression;
};
