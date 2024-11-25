"use client"
import React, { useState } from 'react';

const Calculator = () => {
  // ... (previous state declarations remain the same)
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevNumber, setPrevNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [memory, setMemory] = useState(0);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [isRadians, setIsRadians] = useState(true);

  // Add handleBackspace function
  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // ... (previous handler functions remain the same)
  const handleNumber = (number) => {
    if (resetDisplay) {
      setDisplay(number);
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    setOperation(op);
    setPrevNumber(parseFloat(display));
    setResetDisplay(true);
    setEquation(`${display} ${op}`);
  };

  const handleScientificOperation = (operation) => {
    const number = parseFloat(display);
    let result;

    switch (operation) {
      case 'square':
        result = number * number;
        setEquation(`sqr(${number})`);
        break;
      case 'sqrt':
        result = Math.sqrt(number);
        setEquation(`√(${number})`);
        break;
      case 'sin':
        result = isRadians ? Math.sin(number) : Math.sin(number * Math.PI / 180);
        setEquation(`sin(${number})`);
        break;
      case 'cos':
        result = isRadians ? Math.cos(number) : Math.cos(number * Math.PI / 180);
        setEquation(`cos(${number})`);
        break;
      case 'tan':
        result = isRadians ? Math.tan(number) : Math.tan(number * Math.PI / 180);
        setEquation(`tan(${number})`);
        break;
      case 'log':
        result = Math.log10(number);
        setEquation(`log(${number})`);
        break;
      case 'ln':
        result = Math.log(number);
        setEquation(`ln(${number})`);
        break;
      case '1/x':
        result = 1 / number;
        setEquation(`1/(${number})`);
        break;
      case 'exp':
        result = Math.exp(number);
        setEquation(`e^(${number})`);
        break;
      case 'abs':
        result = Math.abs(number);
        setEquation(`|${number}|`);
        break;
    }

    setDisplay(result.toFixed(8).replace(/\.?0+$/, ''));
    setResetDisplay(true);
  };

  const handleMemoryOperation = (operation) => {
    const currentValue = parseFloat(display);
    
    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setResetDisplay(true);
        break;
      case 'M+':
        setMemory(memory + currentValue);
        setResetDisplay(true);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        setResetDisplay(true);
        break;
    }
  };

  const calculateResult = () => {
    if (prevNumber === null || operation === null) return;

    const current = parseFloat(display);
    let result;

    switch (operation) {
      case '+':
        result = prevNumber + current;
        break;
      case '-':
        result = prevNumber - current;
        break;
      case '×':
        result = prevNumber * current;
        break;
      case '÷':
        result = prevNumber / current;
        break;
      case 'pow':
        result = Math.pow(prevNumber, current);
        break;
      case 'mod':
        result = prevNumber % current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setEquation(`${prevNumber} ${operation} ${current} =`);
    setPrevNumber(null);
    setOperation(null);
    setResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setPrevNumber(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleSpecialValue = (value) => {
    switch (value) {
      case 'π':
        setDisplay(Math.PI.toString());
        break;
      case 'e':
        setDisplay(Math.E.toString());
        break;
      case '±':
        setDisplay((parseFloat(display) * -1).toString());
        break;
    }
    setResetDisplay(true);
  };

  const memoryButtons = ['MC', 'MR', 'M+', 'M-'];
  const scientificButtons = [
    ['sin', 'cos', 'tan', 'mod'],
    ['sqrt', 'square', 'pow', 'abs'],
    ['log', 'ln', '1/x', 'exp']
  ];
  const calculatorButtons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];
  const specialButtons = ['π', 'e', '±'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
        <div className="mb-4">
          <div className="text-gray-400 text-right text-sm h-6 mb-1">
            {equation}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-right text-white text-3xl font-medium tracking-wider">
              {display}
            </div>
          </div>
        </div>

        {/* Clear and Backspace Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={handleClear}
            className="p-4 text-lg font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleBackspace}
            className="p-4 text-lg font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            ⌫
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setIsRadians(!isRadians)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
          <span className="text-gray-400 ml-2 text-sm">
            Memory: {memory}
          </span>
        </div>

        {/* Memory Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {memoryButtons.map((button) => (
            <button
              key={button}
              onClick={() => handleMemoryOperation(button)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg text-sm"
            >
              {button}
            </button>
          ))}
        </div>

        {/* Special Values */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {specialButtons.map((button) => (
            <button
              key={button}
              onClick={() => handleSpecialValue(button)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg"
            >
              {button}
            </button>
          ))}
        </div>

        {/* Scientific Functions */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {scientificButtons.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((button) => (
                <button
                  key={button}
                  onClick={() => handleScientificOperation(button)}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg"
                >
                  {button}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Basic Calculator */}
        <div className="grid grid-cols-4 gap-2">
          {calculatorButtons.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((button) => (
                <button
                  key={button}
                  onClick={() => {
                    if (button === '=') calculateResult();
                    else if (['+', '-', '×', '÷'].includes(button)) handleOperation(button);
                    else if (button === '.') handleDecimal();
                    else handleNumber(button);
                  }}
                  className={`p-4 text-lg font-medium rounded-lg transition-colors ${
                    ['+', '-', '×', '÷', '='].includes(button)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {button}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;