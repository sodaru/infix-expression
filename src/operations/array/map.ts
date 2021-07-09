import { isArray } from "lodash";
import { CallbackFunction, Expression, Operation } from "../../types";
import { isCallbackOperand, isPrefixExpression } from "../../utils";

export const operator = "map";

const MapOperation: Operation<typeof operator> = operands => {
  if (operands.length != 2) {
    throw new Error(`${operator} operator needs exactly 2 operands`);
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
    throw new Error(`operand at 1 must be a callback`);
  }

  if (operand1Type == _prefixExpression) {
    return { [operator]: [operands[0], { callback: callback.expression }] };
  }

  return (operands[0] as Expression[]).map((item, i) => {
    return callback.callback({ item, i });
  });
};

export default MapOperation;
