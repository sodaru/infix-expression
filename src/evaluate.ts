import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isPlainObject,
  isString
} from "lodash";

import {
  callbackKey,
  Expression,
  OperatorLogic,
  PrefixExpression,
  VarExpression,
  varKey
} from "./types";
import {
  isCallbackExpression,
  isCallbackOperand,
  isPrefixExpression,
  isVarExpression
} from "./utils";
import defaultOperations from "./defaultOperations";
import VarOperation from "./var";
import Ajv from "ajv";

type Operators = (string | OperatorLogic)[];

type OperationMap = Record<string, OperatorLogic["logic"]>;

type EvaluateHelper = (expression: Expression, scope: unknown) => Expression;

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

  const _evaluate: EvaluateHelper = (expression, scope) => {
    let result: Expression = null;
    if (
      isString(expression) ||
      isNumber(expression) ||
      isBoolean(expression) ||
      isNull(expression)
    ) {
      result = expression;
    } else if (isArray(expression)) {
      result = expression.map((childExpression: Expression) =>
        _evaluate(childExpression, scope)
      );
    } else if (isCallbackExpression(expression)) {
      result = {
        callback: (args: Record<string, unknown>): Expression => {
          return _evaluate(expression[callbackKey] as Expression, {
            ...args,
            parent: scope
          });
        }
      };
    } else if (isPlainObject(expression)) {
      const keys = Object.keys(expression);
      const evaluatedObject = {};
      keys.forEach(key => {
        evaluatedObject[key] = _evaluate(expression[key] as Expression, scope);
      });

      result = evaluatedObject;

      if (isPrefixExpression(evaluatedObject)) {
        const prefixExpression: PrefixExpression =
          evaluatedObject as PrefixExpression;
        const operator = Object.keys(prefixExpression)[0];
        const operands: Expression[] = prefixExpression[operator];

        const operandsWithCallbackExpression = operands.map((operand, i) => {
          if (isCallbackOperand(operand)) {
            return expression[operator][i];
          }
          return operand;
        });

        result = { [operator]: operandsWithCallbackExpression };

        const operandsContainPrefixExpression = !operands.every(
          operand => !isPrefixExpression(operand)
        );
        if (!operandsContainPrefixExpression) {
          const operation = operations[operator];
          if (operation) {
            // validate operands
            const ajv = new Ajv({ coerceTypes: true });
            const validate = ajv.compile(operation.schema);

            if (!validate(operandsWithCallbackExpression)) {
              throw new Error(
                validate.errors
                  ?.map(e => e.instancePath + " " + e.message)
                  .join(", ")
              );
            }

            result = operation.operation(operands);
          }
        }
      } else if (isVarExpression(evaluatedObject)) {
        const varExpression: VarExpression = evaluatedObject as VarExpression;
        result = VarOperation(varExpression[varKey], scope);
      }
    } else {
      throw new Error(`invalid expression`);
    }
    return result;
  };

  return _evaluate(expression, _data);
};

export default evaluate;
