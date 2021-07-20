import AddOperation, {
  schema as addSchema,
  operator as addOperator
} from "./operations/arithmatic/add";
import SubtractOperation, {
  schema as subtractSchema,
  operator as subtractOperator
} from "./operations/arithmatic/subtract";
import MultiplyOperation, {
  schema as multiplySchema,
  operator as multiplyOperator
} from "./operations/arithmatic/multiply";
import DivideOperation, {
  schema as divideSchema,
  operator as divideOperator
} from "./operations/arithmatic/divide";
import PowerOperation, {
  schema as powerSchema,
  operator as powerOperator
} from "./operations/arithmatic/power";
import ModulusOperation, {
  schema as modulusSchema,
  operator as modulusOperator
} from "./operations/arithmatic/modulus";
import GreaterThanOperation, {
  schema as greaterThanSchema,
  operator as greaterThanOperator
} from "./operations/arithmatic/greaterThan";
import GreaterThanOrEqualOperation, {
  schema as greaterThanOrEqualSchema,
  operator as greaterThanOrEqualOperator
} from "./operations/arithmatic/greaterThanOrEqual";
import LessThanOperation, {
  schema as lessThanSchema,
  operator as lessThanOperator
} from "./operations/arithmatic/lessThan";
import LessThanOrEqualOperation, {
  schema as lessThanOrEqualSchema,
  operator as lessThanOrEqualOperator
} from "./operations/arithmatic/lessThanOrEqual";
import AndOperation, {
  schema as andSchema,
  operator as andOperator
} from "./operations/boolean/and";
import OrOperation, {
  schema as orSchema,
  operator as orOperator
} from "./operations/boolean/or";
import EqualOperation, {
  schema as equalSchema,
  operator as equalOperator
} from "./operations/boolean/equal";
import EqualStrictOperation, {
  schema as equalStrictSchema,
  operator as equalStrictOperator
} from "./operations/boolean/equalStrict";
import NotEqualOperation, {
  schema as notEqualSchema,
  operator as notEqualOperator
} from "./operations/boolean/notEqual";
import NotEqualStrictOperation, {
  schema as notEqualStrictSchema,
  operator as notEqualStrictOperator
} from "./operations/boolean/notEqualStrict";
import IfOperation, {
  schema as ifSchema,
  operator as ifOperator
} from "./operations/boolean/if";
import NotOperation, {
  schema as notSchema,
  operator as notOperator
} from "./operations/boolean/not";

/*
import MaxOperation, {
  operator as maxOperator
} from "./operations/arithmatic/max";
import MinOperation, {
  operator as minOperator
} from "./operations/arithmatic/min";
import MapOperation, { operator as mapOperator } from "./operations/array/map";
import FilterOperation, {
  operator as filterOperator
} from "./operations/array/filter";
import ReduceOperation, {
  operator as reduceOperator
} from "./operations/array/reduce";
import IntersectionOperation, {
  operator as intersectionOperator
} from "./operations/array/intersection";
import UnionOperation, {
  operator as unionOperator
} from "./operations/array/union";
import DiffOperation, {
  operator as diffOperator
} from "./operations/array/diff"; */
import { Expression, Operation } from "./types";
import { JSONSchemaType } from "ajv";

const defaultOperators: Record<
  string,
  { schema: JSONSchemaType<Expression[]>; operation: Operation }
> = {
  [addOperator]: {
    schema: addSchema,
    operation: AddOperation
  },
  [subtractOperator]: {
    schema: subtractSchema,
    operation: SubtractOperation
  },
  [multiplyOperator]: {
    schema: multiplySchema,
    operation: MultiplyOperation
  },
  [divideOperator]: {
    schema: divideSchema,
    operation: DivideOperation
  },
  [powerOperator]: {
    schema: powerSchema,
    operation: PowerOperation
  },
  [modulusOperator]: {
    schema: modulusSchema,
    operation: ModulusOperation
  },
  [greaterThanOperator]: {
    schema: greaterThanSchema,
    operation: GreaterThanOperation
  },
  [greaterThanOrEqualOperator]: {
    schema: greaterThanOrEqualSchema,
    operation: GreaterThanOrEqualOperation
  },
  [lessThanOperator]: {
    schema: lessThanSchema,
    operation: LessThanOperation
  },
  [lessThanOrEqualOperator]: {
    schema: lessThanOrEqualSchema,
    operation: LessThanOrEqualOperation
  },
  [andOperator]: {
    schema: andSchema,
    operation: AndOperation
  },
  [orOperator]: {
    schema: orSchema,
    operation: OrOperation
  },
  [equalOperator]: {
    schema: equalSchema,
    operation: EqualOperation
  },
  [equalStrictOperator]: {
    schema: equalStrictSchema,
    operation: EqualStrictOperation
  },
  [notEqualOperator]: {
    schema: notEqualSchema,
    operation: NotEqualOperation
  },
  [notEqualStrictOperator]: {
    schema: notEqualStrictSchema,
    operation: NotEqualStrictOperation
  },
  [ifOperator]: {
    schema: ifSchema,
    operation: IfOperation
  },
  [notOperator]: {
    schema: notSchema,
    operation: NotOperation
  }
};

export default defaultOperators;
