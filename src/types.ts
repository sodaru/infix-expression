export type EvaluateHelper = (operand: Expression) => Expression;

export type Operation<T extends string = string> = (
  operands: Array<Expression>,
  data: unknown
) => Expression<T>;

export type OperatorLogic = {
  name: string;
  logic: Operation<string>;
};

export type Expression<T extends string = string> =
  | string
  | number
  | boolean
  | null
  | Array<unknown>
  | Record<string, unknown>
  | PrefixExpression<T>;

export type PrefixExpression<T extends string = string> = {
  [operator in T]: Expression[];
};
