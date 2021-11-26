import type { Actions, State } from './types';

import { Action } from './App';
import { useReducer } from 'react';

const initialState: State = {
  operation: null,
  currentOperand: null,
  previousOperand: null,
  overwrite: false,
};

function evaluate({ previousOperand, operation, currentOperand }: State) {
  const prev = parseFloat(previousOperand ?? '');
  const curr = parseFloat(currentOperand ?? '');

  if (isNaN(prev) || isNaN(curr)) return '';

  let computation = '';

  switch (operation) {
    case '+':
      computation = `${prev + curr}`;
      break;
    case '-':
      computation = `${prev - curr}`;
      break;
    case '÷':
      computation = `${prev / curr}`;
      break;
    case '*':
      computation = `${prev * curr}`;
      break;
  }

  return computation;
}

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Action.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: action.payload.digit,
        };
      }
      if (action.payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      if (action.payload.digit === '.' && state.currentOperand?.includes('.')) {
        return state;
      }

      let currentOperand = state.currentOperand;
      if (action.payload.digit !== '0' && state.currentOperand?.charAt(0) === '0') {
        currentOperand = state.currentOperand.slice(1);
      }

      return {
        ...state,
        currentOperand: `${currentOperand ?? ''}${action.payload.digit}`,
      };
    case Action.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand === null) {
        return {
          ...state,
          operation: action.payload.operation,
        };
      }

      if (state.previousOperand === null) {
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        operation: action.payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };
    case Action.REMOVE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) return state;

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case Action.CALC:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
        overwrite: true,
      };
    case Action.CLEAR:
      return { ...initialState, overwrite: false };
    default:
      throw new Error();
  }
};

export function useSimpleCalculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return {
    currentOperand,
    previousOperand,
    operation,
    dispatch,
  }
}
