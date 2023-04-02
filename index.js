const operations = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    return a / b;
  }
};

const operators = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
};

const calculation = {
  firstNum: null,
  secondNum: null,
  operator: null,
  operate() {
    switch (this.operator) {
      case '+':
        return operations.add(Number(this.firstNum), Number(this.secondNum));
      case '-':
        return operations.subtract(Number(this.firstNum), Number(this.secondNum));
      case '*':
        return operations.multiply(Number(this.firstNum), Number(this.secondNum));
      case '/':
        let result = operations.divide(Number(this.firstNum), Number(this.secondNum));
        return result === Infinity || result === -Infinity ? 'nope' : result; // can't divide by zero
    }
  }
};

let currentValue = '';
let resulted = false;
let point = false;

function calculateResult() { // calculates and shows calculated result
  let result = calculation.operate().toString();
  if (result.includes('.')) {
    point = true;
  }
  displayedValue.textContent = result;
  calculation.firstNum = null;
  calculation.secondNum = null;
  return result;
}


function calculatePercentage() {
  if (currentValue && currentValue !== '0' && currentValue !== '0.') {
    displayedValue.textContent = displayedValue.textContent.slice(0, -currentValue.length);
    currentValue /= 100;
    currentValue = currentValue.toString();
    if (currentValue.includes('.')) {
      point = true;
    }
    displayedValue.textContent += currentValue;
  }
}


function getOperator(e) {
  // Choose an operator
  if (currentValue) {
    // get firstNum / secondNum, and operator;
    if (!calculation.firstNum) {
      calculation.firstNum = currentValue;
      currentValue = '';
      resulted = false;
      inputOperator(e);      
    } else {
      calculation.secondNum = currentValue;
      currentValue = '';
      let result = calculateResult();
      calculation.firstNum = result;
      inputOperator(e);
    }
  // Choose another operator if already have chosen one
  } else if (!currentValue && displayedValue.textContent) {
    displayedValue.textContent = displayedValue.textContent.slice(0, -1);
    inputOperator(e);
  }
}


function inputOperator(e) {
  calculation.operator = e.key || operators[e.target.id];
  displayedValue.textContent += e.key || e.target.textContent;
  point = false;
}


function inputNumber(e) {
  if (resulted) {
    if (currentValue === '0') {
      displayedValue.textContent = e.key || e.target.textContent;
      currentValue = e.key || e.target.textContent;
    } else {
      displayedValue.textContent = e.key || e.target.textContent;
      currentValue = e.key || e.target.textContent;
      resulted = false;
      point = false;
    }
  } else {
    if (currentValue === '0' && !calculation.firstNum) {
      displayedValue.textContent = e.key || e.target.textContent;
      currentValue = e.key || e.target.textContent;
    } else {
      displayedValue.textContent += e.key || e.target.textContent;
      currentValue += e.key || e.target.textContent;
    }
  }
}


function inputPoint() {
  if (!point) {
    if (!currentValue) {
      displayedValue.textContent += 0 + '.';
      currentValue += 0 + '.';
      point = true;
    } else {
      displayedValue.textContent += '.';
      currentValue += '.';
      point = true;
      resulted = false;
    }
  }
}


function outputResult() {
  if (calculation.firstNum && currentValue && calculation.operator) {
    calculation.secondNum = currentValue;
    let result = calculateResult();
    resulted = true;
    currentValue = result;
    calculation.operator = null;
  }
}


function multiplyByMinusOne() {
  if (currentValue && currentValue !== '0' && !calculation.firstNum) {
    currentValue *= -1;
    currentValue = currentValue.toString();
    displayedValue.textContent = currentValue;
  }
}


function clearEverything() {
  displayedValue.textContent = '';
  currentValue = '';
  calculation.firstNum = null;
  calculation.operator = null;
  point = false;
  resulted = false;
}


function deleteChar() {
  if (currentValue) {
    if (currentValue[currentValue.length - 1] === '.') {
      point = false;
    }
    currentValue = currentValue.slice(0, -1);
    displayedValue.textContent = displayedValue.textContent.slice(0, -1);
    resulted = false;
  } else if (!currentValue && calculation.firstNum) {
    currentValue = calculation.firstNum;
    calculation.firstNum = null;
    calculation.operator = null;
    displayedValue.textContent = displayedValue.textContent.slice(0, -1);
  }
}

const displayedValue = document.querySelector('.display .value');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const pointBtn = document.querySelector('.point');
const clearBtn = document.querySelector('.clear');
const plusMinusBtn = document.querySelector('.plus-minus');
const percentageBtn = document.querySelector('.percentage');
const deleteBtn = document.querySelector('.delete');

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === "1" || e.key === "2" || e.key === "3" || 
      e.key === "4" || e.key === "5" || e.key === "6" || 
      e.key === "7" || e.key === "8" || e.key === "9" ||
      e.key === "0") {
    inputNumber(e);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    if (e.key === "/") {
      e.preventDefault();
    }
    getOperator(e);
  } else if (e.key === "=" || e.key === "Enter") {
    outputResult();
  } else if (e.key === "%") {
    calculatePercentage();
  } else if (e.key === ".") {
    inputPoint(e);
  } else if (e.key === "Tab") {
    e.preventDefault();
    multiplyByMinusOne();
  } else if (e.key === "Escape" || e.key === "Esc") {
    clearEverything();
  } else if (e.key === "Backspace") {
    deleteChar();
  }
});

// Clicking
numberBtns.forEach(number => {
  number.addEventListener('click', (e) => {
    inputNumber(e);
  });
});

operatorBtns.forEach(operator => {
  operator.addEventListener('click', (e) => {
    getOperator(e);
  });
});

equalBtn.addEventListener('click', () => {
  outputResult();
});

pointBtn.addEventListener('click', () => {
  inputPoint();
});

clearBtn.addEventListener('click', () => {
  clearEverything();
});

plusMinusBtn.addEventListener('click', () => {
  multiplyByMinusOne();
});

percentageBtn.addEventListener('click', () => {
  calculatePercentage();
});

deleteBtn.addEventListener('click', () => {
  deleteChar();
});