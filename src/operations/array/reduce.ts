import { isArray } from "lodash";
import { CallbackFunction, Expression, Operation } from "../../types";
import { isCallbackOperand, isPrefixExpression } from "../../utils";

export const operator = "reduce";

const ReduceOperation: Operation<typeof operator> = operands => {
  if (operands.length != 3) {
    throw new Error(`${operator} operator needs exactly 3 operands`);
  }

  const _prefixExpression = "prefixExpression";
  const _array = "array";

  const operand1Type = isPrefixExpression(operands[0])
    ? _prefixExpression
    : isArray(operands[0])
    ? _array
    : null;

  if (operand1Type == null) {
    throw new Error(`Can not apply ${operator} Operation on operand at 0`);
  }

  const callback = isCallbackOperand(operands[1])
    ? (operands[1] as unknown as {
        callback: CallbackFunction;
        expression: Expression;
      })
    : null;

  if (callback == null) {
    throw new Error(`operand at 1 must be a callback for ${operator} operator`);
  }

  const operand3Type = isPrefixExpression(operands[2])
    ? _prefixExpression
    : null;

  if (operand1Type == _prefixExpression || operand3Type == _prefixExpression) {
    return {
      [operator]: [operands[0], { callback: callback.expression }, operands[2]]
    };
  }

  return (operands[0] as Expression[]).reduce((prev, item, i) => {
    return callback.callback({ prev, item, i });
  }, operands[2]);
};

export default ReduceOperation;
