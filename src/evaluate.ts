import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isPlainObject,
  isString
} from "lodash";
import AddOperation, { operator as addOperator } from "./operations/add";
import SubtractOperation, {
  operator as subtractOperator
} from "./operations/subtract";
import MultiplyOperation, {
  operator as multiplyOperator
} from "./operations/multiply";
import DivideOperation, {
  operator as divideOperator
} from "./operations/divide";
import {
  EvaluateHelper,
  Expression,
  Operation,
  OperatorLogic,
  PrefixExpression
} from "./types";
import { isPrefixExpression } from "./utils";

type Operators = (string | OperatorLogic)[];

type OperationMap = Record<string, Operation<string>>;

const defaultOperations: OperationMap = {
  [addOperator]: AddOperation,
  [subtractOperator]: SubtractOperation,
  [multiplyOperator]: MultiplyOperation,
  [divideOperator]: DivideOperation
};

const evaluate = (
  expression: Expression,
  data?: unknown,
  operators?: Operators
): Expression => {
  const _data = data === undefined ? {} : data;
  const _operators: Operators =
    operators === undefined ? Object.keys(defaultOperations) : operators;

  const operations: OperationMap = {};
  _operators.forEach(_operator => {
    if (isString(_operator)) {
      if (!defaultOperations[_operator]) {
        throw new Error(`No default Operation Logic for ${_operator}`);
      }
      operations[_operator] = defaultOperations[_operator];
    } else {
      operations[_operator.name] = _operator.logic;
    }
  });

  const _evaluate: EvaluateHelper = operand => {
    let result: Expression = null;
    if (
      isString(operand) ||
      isNumber(operand) ||
      isBoolean(operand) ||
      isNull(operand)
    ) {
      result = operand;
    } else if (isArray(operand)) {
      result = operand.map(_evaluate);
    } else if (isPlainObject(operand)) {
      const keys = Object.keys(operand);
      const evaluatedObject = {};
      keys.forEach(key => {
        evaluatedObject[key] = _evaluate(operand[key] as Expression);
      });

      result = evaluatedObject;

      if (isPrefixExpression(evaluatedObject)) {
        const prefixExpression: PrefixExpression =
          evaluatedObject as PrefixExpression;
        const operator = Object.keys(prefixExpression)[0];
        const operands: Expression[] = prefixExpression[operator];

        const operation = operations[operator];
        if (operation) {
          result = operation(operands, _data);
        }
      }
    } else {
      throw new Error(`invalid operand`);
    }
    return result;
  };

  return _evaluate(expression);
};

export default evaluate;
