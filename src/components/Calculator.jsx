import { useReducer, useState } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand === null) {
        return state;
      }

      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: '0',
        previousOperand: null,
        operation: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case 'x':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTERGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTERGER_FORMATTER.format(integer);
  return `${INTERGER_FORMATTER.format(integer)}.${decimal}`;
}

export default function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const [theme, setTheme] = useState({
    first: true,
    second: false,
    third: false,
  });

  const keyCSS =
    'text-skin-main bg-skin-key-num rounded-sm px-2 sm:px-3 md:px-4 pt-2 pb-1  font-bold border-b-4 border-b-skin-key-num-sd hover:bg-skin-toggle';

  return (
    <div
      className={`bg-skin-main h-screen w-full ${
        theme.second && 'theme-second'
      } ${theme.third && 'theme-third'} flex justify-center item-center`}
    >
      <div className={`p-4 m-auto align-middle max-w-[500px] max-h-[650px]`}>
        <div
          className={`${
            theme.first ? 'text-skin-second' : 'text-skin-main'
          } flex justify-between  items-center mb-3`}
        >
          <h1 className='text-sm font-bold '>calc</h1>
          <div className='flex justify-between items-center'>
            <p className='text-[0.4rem] mr-3 mb-[0.1rem] self-end font-bold tracking-widest'>
              THEME
            </p>
            <div>
              <div className='grid grid-cols-3'>
                <p className='justify-self-center text-[0.35rem] font-semibold '>
                  1
                </p>
                <p className='justify-self-center text-[0.35rem] font-semibold'>
                  2
                </p>
                <p className='justify-self-center text-[0.35rem] font-semibold'>
                  3
                </p>
              </div>
              <div className='bg-skin-toggle p-[0.15rem] grid grid-cols-3 rounded-full'>
                <button
                  className={
                    theme.first && `bg-skin-key-result h-2 w-2 rounded-full`
                  }
                  onClick={() =>
                    setTheme({
                      first: true,
                      second: false,
                      third: false,
                    })
                  }
                ></button>
                <button
                  className={
                    theme.second && `bg-skin-key-result h-2 w-2 rounded-full`
                  }
                  onClick={() =>
                    setTheme({
                      first: false,
                      second: true,
                      third: false,
                    })
                  }
                ></button>
                <button
                  className={
                    theme.third && `bg-skin-key-result h-2 w-2 rounded-full`
                  }
                  onClick={() =>
                    setTheme({
                      first: false,
                      second: false,
                      third: true,
                    })
                  }
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-skin-screen ${
            theme.first ? 'text-skin-second' : 'text-skin-main'
          } text-2xl font-bold text-right px-3 py-2 pb-1 rounded-md leading-none mb-3 h-10`}
          style={{ wordWrap: 'break-word' }}
        >
          <div className='text-[0.5rem] min-h-2'>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className='text-sm min-h-2'>{formatOperand(currentOperand)}</div>
        </div>
        <div className='bg-skin-toggle p-3 rounded-md grid grid-cols-4 gap-[0.4rem]'>
          <DigitButton
            dispatch={dispatch}
            digit='0'
            classBtn={`${keyCSS} row-start-4 col-start-2`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='1'
            classBtn={`${keyCSS} row-start-3 col-start-1`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='2'
            classBtn={`${keyCSS} row-start-3 col-start-2`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='3'
            classBtn={`${keyCSS} row-start-3 col-start-3`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='4'
            classBtn={`${keyCSS} row-start-2 col-start-1`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='5'
            classBtn={`${keyCSS} row-start-2 col-start-2`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='6'
            classBtn={`${keyCSS} row-start-2 col-start-3`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='7'
            classBtn={`${keyCSS} row-start-1 col-start-1`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='8'
            classBtn={`${keyCSS} row-start-1 col-start-2`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='9'
            classBtn={`${keyCSS} row-start-1 col-start-3`}
          />
          <DigitButton
            dispatch={dispatch}
            digit='.'
            classBtn={`${keyCSS} row-start-4 col-start-1`}
          />
          <OperationButton
            dispatch={dispatch}
            operation='+'
            classBtn={`${keyCSS} row-start-2 col-start-4`}
          />
          <OperationButton
            dispatch={dispatch}
            operation='-'
            classBtn={`${keyCSS} row-start-3 col-start-4`}
          />
          <OperationButton
            dispatch={dispatch}
            operation='x'
            classBtn={`${keyCSS} row-start-4 col-start-4`}
          />
          <OperationButton
            dispatch={dispatch}
            operation='/'
            classBtn={`${keyCSS} row-start-4 col-start-3`}
          />

          <button
            className={`rounded-sm pt-2 pb-1  font-bold border-b-4 border-b-skin-key-num-sd text-[0.6rem] text-skin-second border-b-skin-key-sd row-start-1 col-start-4 bg-skin-key hover:bg-skin-key-tg`}
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            DEL
          </button>
          <button
            className={`rounded-sm pt-2 pb-1  font-bold border-b-4 border-b-skin-key-num-sd text-[0.6rem] text-skin-second border-b-skin-key-sd row-start-5 col-start-1 col-end-3 bg-skin-key hover:bg-skin-key-tg`}
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            RESET
          </button>
          <button
            className={`rounded-sm pt-2 pb-1 font-bold border-b-4 text-[0.6rem] bg-skin-key-result border-b-skin-key-result-sd row-start-5 col-start-3 col-end-5 ${
              theme.third ? 'text-skin-third' : 'text-skin-second'
            } hover:bg-skin-key-result-tg `}
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
