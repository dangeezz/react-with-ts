import './app.css';

import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import { useSimpleCalculator } from './useSimpleCalculator';

export enum Action {
  ADD_DIGIT = 'add digit',
  REMOVE_DIGIT = 'remove digit',
  CHOOSE_OPERATION = 'choose operation',
  CLEAR = 'clear',
  CALC = 'calc',
}

export default function App() {
  const { operation, currentOperand, previousOperand, dispatch } = useSimpleCalculator();

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      <button className="span-2" onClick={() => dispatch({ type: Action.CLEAR })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: Action.REMOVE_DIGIT })}>DEL</button>

      <OperationButton operation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />

      <button className="span-2" onClick={() => dispatch({ type: Action.CALC })}>
        =
      </button>
    </div>
  );
}
