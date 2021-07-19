import { isArray, isPlainObject } from "lodash";
import {
  CallbackExpression,
  callbackKey,
  Expression,
  PrefixExpression,
  VarExpression,
  varKey
} from "./types";

export const isPrefixExpression = (operand: Expression): boolean => {
  const _operand = operand as PrefixExpression;
  let isPrefixExpression = false;
  if (isPlainObject(_operand) && Object.keys(_operand).length == 1) {
    const operator = Object.keys(_operand)[0];
    if (
      operator != callbackKey &&
      operator != varKey &&
      isArray(_operand[operator])
    ) {
      isPrefixExpression = true;
    }
  }
  return isPrefixExpression;
};

export const isVarExpression = (operand: Expression): boolean => {
  const _operand = operand as VarExpression;
  let isVarExpression = false;
  if (isPlainObject(_operand) && Object.keys(_operand).length == 1) {
    const operator = Object.keys(_operand)[0];
    if (operator == varKey && isArray(_operand[operator])) {
      isVarExpression = true;
    }
  }
  return isVarExpression;
};

export const isCallbackExpression = (operand: Expression): boolean => {
  const _operand = operand as CallbackExpression;
  let isCallbackExpression = false;
  if (isPlainObject(_operand) && Object.keys(_operand).length == 1) {
    const operator = Object.keys(_operand)[0];
    if (operator == callbackKey) {
      isCallbackExpression = true;
    }
  }
  return isCallbackExpression;
};

export const isCallbackOperand = (operand: Expression): boolean => {
  const _operand = operand as {
    callback: () => Expression;
    expression: Expression;
  };
  let isCallbackOperand = false;
  if (isPlainObject(operand) && Object.keys(_operand).length == 2) {
    const keys = Object.keys(_operand);
    if (keys[0] == callbackKey && keys[1] == "expression") {
      isCallbackOperand = true;
    }
  }
  return isCallbackOperand;
};
