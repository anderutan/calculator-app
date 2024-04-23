import { useState } from 'react';

export default function Calculator() {
  const [firstNum, setFirstNum] = useState('');
  const [operator, setOperator] = useState('');
  const [secondNum, setSecondNum] = useState('');
  const [result, setResult] = useState('');
  const [theme, setTheme] = useState({
    first: true,
    second: false,
    third: false,
  });

  function handleNumClick(num) {
    if (!operator && !secondNum && !result) {
      setFirstNum((prev) => prev + num);
    } else if (!operator && !secondNum && result) {
      setResult('');
      setFirstNum((prev) => prev + num);
    } else {
      setSecondNum((prev) => prev + num);
    }
  }

  function handleOperationClick(type) {
    setOperator(type);
  }

  function handleCalculate() {
    const num1 = parseInt(firstNum);
    const num2 = parseInt(secondNum);
    if (operator === '+') setResult(num1 + num2);
    else if (operator === '-') setResult(num1 - num2);
    else if (operator === '*') setResult(num1 * num2);
    else if (operator === '/') setResult(num1 / num2);
    setFirstNum('');
    setOperator('');
    setSecondNum('');
  }

  function handleResetClick() {
    setFirstNum('');
    setOperator('');
    setSecondNum('');
    setResult('');
  }

  function handleDeleteClick() {
    if (!operator && !secondNum) {
      setFirstNum((prev) => prev.slice(0, -1));
    } else if (!secondNum) {
      setOperator('');
    } else {
      setSecondNum((prev) => prev.slice(0, -1));
    }
  }

  function addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const keyCSS =
    'text-skin-main bg-skin-key-num rounded-sm pt-2 pb-1  font-bold border-b-4 border-b-skin-key-num-sd';

  return (
    <div
      className={`bg-skin-main h-full w-full p-4 ${
        theme.second && 'theme-second'
      } ${theme.third && 'theme-third'}`}
    >
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
        } text-2xl font-bold text-right px-3 py-2 rounded-md leading-none mb-3 `}
      >
        <div>
          {!operator && !secondNum && !result
            ? addComma(firstNum) || '0'
            : !secondNum && !result
            ? operator
            : !result
            ? addComma(secondNum)
            : addComma(result)}
        </div>
      </div>
      <div className='bg-skin-toggle p-3 rounded-md grid grid-cols-4 gap-[0.4rem]'>
        <button
          onClick={() => handleNumClick(0)}
          className={`${keyCSS} row-start-4 col-start-2`}
        >
          0
        </button>
        <button
          onClick={() => handleNumClick(1)}
          className={`${keyCSS} row-start-3 col-start-1`}
        >
          1
        </button>
        <button
          onClick={() => handleNumClick(2)}
          className={`${keyCSS} row-start-3 col-start-2`}
        >
          2
        </button>
        <button
          onClick={() => handleNumClick(3)}
          className={`${keyCSS} row-start-3 col-start-3`}
        >
          3
        </button>
        <button
          onClick={() => handleNumClick(4)}
          className={`${keyCSS} row-start-2 col-start-1`}
        >
          4
        </button>
        <button
          onClick={() => handleNumClick(5)}
          className={`${keyCSS} row-start-2 col-start-2`}
        >
          5
        </button>
        <button
          onClick={() => handleNumClick(6)}
          className={`${keyCSS} row-start-2 col-start-3`}
        >
          6
        </button>
        <button
          onClick={() => handleNumClick(7)}
          className={`${keyCSS} row-start-1 col-start-1`}
        >
          7
        </button>
        <button
          onClick={() => handleNumClick(8)}
          className={`${keyCSS} row-start-1 col-start-2`}
        >
          8
        </button>
        <button
          onClick={() => handleNumClick(9)}
          className={`${keyCSS} row-start-1 col-start-3`}
        >
          9
        </button>
        <button
          onClick={() => handleNumClick('.')}
          className={`${keyCSS} row-start-4 col-start-1`}
        >
          .
        </button>
        <button
          onClick={() => handleOperationClick('+')}
          className={`${keyCSS} row-start-2 col-start-4`}
        >
          +
        </button>
        <button
          onClick={() => handleOperationClick('-')}
          className={`${keyCSS} row-start-3 col-start-4`}
        >
          -
        </button>
        <button
          onClick={() => handleOperationClick('*')}
          className={`${keyCSS} row-start-4 col-start-4`}
        >
          x
        </button>
        <button
          onClick={() => handleOperationClick('/')}
          className={`${keyCSS} row-start-4 col-start-3`}
        >
          /
        </button>
        <button
          onClick={handleDeleteClick}
          className={`rounded-sm pt-2 pb-1  font-bold border-b-4 border-b-skin-key-num-sd text-[0.6rem] text-skin-second border-b-skin-key-sd row-start-1 col-start-4 bg-skin-key`}
        >
          DEL
        </button>
        <button
          onClick={handleResetClick}
          className={`rounded-sm pt-2 pb-1  font-bold border-b-4 border-b-skin-key-num-sd text-[0.6rem] text-skin-second border-b-skin-key-sd row-start-5 col-start-1 col-end-3 bg-skin-key`}
        >
          RESET
        </button>
        <button
          onClick={handleCalculate}
          className={`${keyCSS} text-[0.6rem] bg-skin-key-result text-skin-second border-b-skin-key-result-sd row-start-5 col-start-3 col-end-5`}
        >
          =
        </button>
      </div>
    </div>
  );
}
