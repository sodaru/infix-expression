# prefix-expression

Library to Evaluate Prefix Expressions represented in JSON

[![Publish](https://github.com/sodaru/prefix-expression/actions/workflows/publish.to.npm.yml/badge.svg)](https://github.com/sodaru/prefix-expression/actions/workflows/publish.to.npm.yml)

> npm i [prefix-expression](http://www.npmjs.com/package/prefix-expression)

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
    ( `+`, `-`, `*`, `/`, `pow`, `%` )
  - Comparision  
    ( `>`, `>=`, `<`, `<=` )
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
  - ( `includes` )
  - ( `size` ) _works with string also_
  - ( `max`, `min` )
- String
  - ( `indexOf` )
  - ( `concat` )
  - ( `size` ) _works with array also_
- Object
  - ( `entries` )
- Special Operators  
   _Special Operators can not be overrided or removed_
  - Data Access  
    ( `var` )  
    _Uses [JSONPath](https://www.npmjs.com/package/jsonpath) to access data_  
    has 2 operands , 1st is a JSON path string or an expression which resolves into a string , 2nd is boolean indicating to return all or 1st result from json path query
  - Callback  
    ( `callback` )  
    to differ the evaluation of expression until parent expression is evaluated ... parent Operation can use the callback to evaluate child expression with new data

## Install

```SH
npm i prefix-expression
```

## Usage

### evaluate

```TS
import { evaluate, PrefixExpression, Expression } from "prefix-expression"

// prefix expression
const expression: PrefixExpression;

// simple evaluate
const result = evaluate(expression);

// evaluate with data
const data: unknown;
const result = evaluate(expression, data);

// overide the operators
type OperatorLogic = {
  name: string;
  logic: {
    schema: JSONSchemaType<Expression[]>;
    operation: (operands: Expression)=>Expression};
}
const operators: (string|OperatorLogic)[];
const result = evaluate(expression, {}, operators);

```

- `result` is either result of the expression OR reduced expression with unresolved data
- result can be still evaluated when more data is available

---

## Support

This project is a part of Open Source Intitiative from [Sodaru Technologies](https://sodaru.com)

Write an email to opensource@sodaru.com for queries on this project
