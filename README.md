# prefix-expression

Library to Evaluate Prefix Expressions represented in JSON

## Overview

[prefix expression](https://en.wikipedia.org/wiki/Polish_notation) can be represented in JSON Format as follows

```JS
EXPRESSION = {
    OPERATOR : [
        ...OPERANDS
    ]
}
```

An `OPERAND` can be `strng`, `number`, `boolean`, `null`, `array` or `EXPRESSION`
The type and number of `OPERAND`s are defined by each operator

The supported `OPERATOR`s are

- Numeric
  - Arithmatic  
    ( `+`, `-`, `*`, `/`, `^`, `%` )
  - Comparision  
    ( `>`, `>=`, `<`, `<=`, `BETWEEN` ) _BETWEEN requires 3 operands [valueToCompare, minRange, maxRange]_
  - Others  
    ( `max`, `min` ) _max and min requires an array of operands_
- Boolean Logic
  - Comparision  
    ( `==`, `===`, `!=`, `!==` )
  - Negate  
    ( `!` )
  - Logical  
    ( `or`, `and` )
  - Others  
    ( `if` ) _if requires 3 operands [condition, trueValue, falseValue]_
- Array
  - ( `map`, `reduce`, `filter` )
  - ( `intersection`, `diff`, `union` )
  - ( `contains` )
  - ( `length` )
- String
  - ( `match` )
  - ( `cat` )
  - ( `substr`, `length` )
- Data Access
  - ( `var` ) _Uses [JSONPath](https://www.npmjs.com/package/jsonpath) to access data_

## Install

```SH
npm i infix-expression
```

## Usage

### evaluate

```TS
import { evaluate } from "infix-expression"

// infix expression
const expression: InfixExpression;

// simple evaluate
const result = evaluate(expression);

// evaluate with data
const data: unknown;
const result = evaluate(expression, data);

// overide the operators
type OperatorLogic = {
  name: string;
  logic: (operands)=>unknown;
}
const operators: (string|OperatorLogic)[];
const result = evaluate(expression, {}, operators);

```

- `result` is either result of the expression OR reduced expression with unresolved data
- result can be still evaluated when more data is available
