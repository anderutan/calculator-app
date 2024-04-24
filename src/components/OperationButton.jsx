import { ACTIONS } from './Calculator';

export default function OperationButton({ dispatch, operation, classBtn }) {
  return (
    <button
      className={classBtn}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
