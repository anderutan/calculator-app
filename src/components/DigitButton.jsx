import { ACTIONS } from './Calculator.jsx';

export default function DigitButton({ dispatch, digit, classBtn }) {
  return (
    <button
      className={classBtn}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
