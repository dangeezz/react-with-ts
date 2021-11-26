import { Action } from './App';
import type { Actions } from './types';

type DigitButtonProp = {
  digit: string;
  dispatch: React.Dispatch<Actions>;
};

export default function DigitButton({ digit, dispatch }: DigitButtonProp) {
  return (
    <button onClick={() => dispatch({ type: Action.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
}
