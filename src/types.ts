import { JSONSchemaType } from "ajv";

export type Operation<T extends string = string> = (
  operands: Array<Expression>
) => Expression<T>;

export type OperatorLogic = {
  name: string;
  logic: {
    schema: JSONSchemaType<Expression[]>;
    operation: Operation<string>;
  };
};

export const callbackKey = "callback";

export const varKey = "var";

export type CallbackExpression = {
  [callbackKey]: Expression;
};

export type CallbackFunction = (args: Record<string, unknown>) => Expression;

export type VarExpression = {
  [varKey]: [string | PrefixExpression, boolean | PrefixExpression];
};

export type Expression<T extends string = string> =
  | string
  | number
  | boolean
  | null
  | Array<unknown>
  | Record<string, unknown>
  | VarExpression
  | CallbackExpression
  | PrefixExpression<T>;

export type PrefixExpression<T extends string = string> = {
  [operator in T]: Expression[];
};
