import { isArray, isPlainObject } from "lodash";
import { callbackKey, Expression, varKey } from "./types";

export const isPrefixExpression = (operand: Expression): boolean => {
  let isPrefixExpression = false;
  if (isPlainObject(operand) && Object.keys(operand).length == 1) {
    const operator = Object.keys(operand)[0];
    if (
      operator != callbackKey &&
      operator != varKey &&
      isArray(operand[operator])
    ) {
      isPrefixExpression = true;
    }
  }
  return isPrefixExpression;
};

export const isVarExpression = (operand: Expression): boolean => {
  let isVarExpression = false;
  if (isPlainObject(operand) && Object.keys(operand).length == 1) {
    const operator = Object.keys(operand)[0];
    if (operator == varKey && isArray(operand[operator])) {
      isVarExpression = true;
    }
  }

  return isVarExpression;
};

export const isCallbackExpression = (operand: Expression): boolean => {
  let isCallbackExpression = false;
  if (isPlainObject(operand) && Object.keys(operand).length == 1) {
    const operator = Object.keys(operand)[0];
    if (operator == callbackKey) {
      isCallbackExpression = true;
    }
  }

  return isCallbackExpression;
};
