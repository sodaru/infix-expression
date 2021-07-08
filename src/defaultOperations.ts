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

export default {
  [addOperator]: AddOperation,
  [subtractOperator]: SubtractOperation,
  [multiplyOperator]: MultiplyOperation,
  [divideOperator]: DivideOperation,
  [powerOperator]: PowerOperation,
  [modulusOperator]: ModulusOperation
};
