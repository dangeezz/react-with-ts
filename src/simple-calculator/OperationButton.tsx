import { Action } from './App';
import type { Actions } from './types';

type OperationButtonProp = {
  operation: string;
  dispatch: React.Dispatch<Actions>;
};

export default function OperationButton({ operation, dispatch }: OperationButtonProp) {
  return (
    <button onClick={() => dispatch({ type: Action.CHOOSE_OPERATION, payload: { operation } })}>
      {operation}
    </button>
  );
}
