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
import PowerOperation, { operator as powerOperator } from "./operations/power";
import ModulusOperation, {
  operator as modulusOperator
} from "./operations/modulus";
import GreaterThanOperation, {
  operator as greaterThanOperator
} from "./operations/greaterThan";
import GreaterThanOrEqualOperation, {
  operator as greaterThanOrEqualOperator
} from "./operations/greaterThanOrEqual";
import LessThanOperation, {
  operator as lessThanOperator
} from "./operations/lessThan";
import LessThanOrEqualOperation, {
  operator as lessThanOrEqualOperator
} from "./operations/lessThanOrEqual";
import MaxOperation, { operator as maxOperator } from "./operations/max";
import MinOperation, { operator as minOperator } from "./operations/min";
import EqualOperation, { operator as equalOperator } from "./operations/equal";
import EqualStrictOperation, {
  operator as equalStrictOperator
} from "./operations/equalStrict";
import NotEqualOperation, {
  operator as notEqualOperator
} from "./operations/notEqual";
import NotEqualStrictOperation, {
  operator as notEqualStrictOperator
} from "./operations/notEqualStrict";

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
  [notEqualStrictOperator]: NotEqualStrictOperation
};
