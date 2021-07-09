import AddOperation, {
  operator as addOperator
} from "./operations/arithmatic/add";
import SubtractOperation, {
  operator as subtractOperator
} from "./operations/arithmatic/subtract";
import MultiplyOperation, {
  operator as multiplyOperator
} from "./operations/arithmatic/multiply";
import DivideOperation, {
  operator as divideOperator
} from "./operations/arithmatic/divide";
import PowerOperation, {
  operator as powerOperator
} from "./operations/arithmatic/power";
import ModulusOperation, {
  operator as modulusOperator
} from "./operations/arithmatic/modulus";
import GreaterThanOperation, {
  operator as greaterThanOperator
} from "./operations/arithmatic/greaterThan";
import GreaterThanOrEqualOperation, {
  operator as greaterThanOrEqualOperator
} from "./operations/arithmatic/greaterThanOrEqual";
import LessThanOperation, {
  operator as lessThanOperator
} from "./operations/arithmatic/lessThan";
import LessThanOrEqualOperation, {
  operator as lessThanOrEqualOperator
} from "./operations/arithmatic/lessThanOrEqual";
import MaxOperation, {
  operator as maxOperator
} from "./operations/arithmatic/max";
import MinOperation, {
  operator as minOperator
} from "./operations/arithmatic/min";
import EqualOperation, {
  operator as equalOperator
} from "./operations/boolean/equal";
import EqualStrictOperation, {
  operator as equalStrictOperator
} from "./operations/boolean/equalStrict";
import NotEqualOperation, {
  operator as notEqualOperator
} from "./operations/boolean/notEqual";
import NotEqualStrictOperation, {
  operator as notEqualStrictOperator
} from "./operations/boolean/notEqualStrict";
import NotOperation, {
  operator as notOperator
} from "./operations/boolean/not";
import OrOperation, { operator as orOperator } from "./operations/boolean/or";
import AndOperation, {
  operator as andOperator
} from "./operations/boolean/and";
import IfOperation, { operator as ifOperator } from "./operations/boolean/if";

export default {
  [addOperator]: AddOperation,
  [subtractOperator]: SubtractOperation,
  [multiplyOperator]: MultiplyOperation,
  [divideOperator]: DivideOperation,
  [powerOperator]: PowerOperation,
  [modulusOperator]: ModulusOperation,
  [greaterThanOperator]: GreaterThanOperation,
  [greaterThanOrEqualOperator]: GreaterThanOrEqualOperation,
  [lessThanOperator]: LessThanOperation,
  [lessThanOrEqualOperator]: LessThanOrEqualOperation,
  [maxOperator]: MaxOperation,
  [minOperator]: MinOperation,
  [equalOperator]: EqualOperation,
  [equalStrictOperator]: EqualStrictOperation,
  [notEqualOperator]: NotEqualOperation,
  [notEqualStrictOperator]: NotEqualStrictOperation,
  [notOperator]: NotOperation,
  [orOperator]: OrOperation,
  [andOperator]: AndOperation,
  [ifOperator]: IfOperation
};
