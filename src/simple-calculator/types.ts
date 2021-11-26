import { Action } from './App';

export type State = {
  operation: string | null;
  currentOperand: string | null;
  previousOperand: string | null;
  overwrite: boolean;
};

export type Actions =
  | { type: Action.CLEAR }
  | { type: Action.CALC }
  | { type: Action.REMOVE_DIGIT }
  | { type: Action.ADD_DIGIT; payload: { digit: string } }
  | { type: Action.CHOOSE_OPERATION; payload: { operation: string } };
