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


function getOperator(e) {
  calculation.operator = operators[e.target.id];
  displayedValue.textContent += e.target.textContent;
  point = false;
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

let currentValue = '';

function inputNumbers() {
  numberBtns.forEach(number => {
    number.addEventListener('click', (e) => {
      if (resulted) {
        if (currentValue === '0') {
          displayedValue.textContent = e.target.textContent;
          currentValue = e.target.textContent;
        } else {
          displayedValue.textContent = e.target.textContent;
          currentValue = e.target.textContent;
          resulted = false;
          point = false;
        }
      } else {
        if (currentValue === '0' && !calculation.firstNum) {
          displayedValue.textContent = e.target.textContent;
          currentValue = e.target.textContent;
        } else {
          displayedValue.textContent += e.target.textContent;
          currentValue += e.target.textContent;
        }
      }
    });
  });
}

inputNumbers();


function inputOperators() {
  operatorBtns.forEach(operator => {
    operator.addEventListener('click', (e) => {
      // Choose an operator
      if (currentValue) {
        // get firstNum / secondNum, and operator;
        if (!calculation.firstNum) {
          calculation.firstNum = currentValue;
          currentValue = '';
          resulted = false;
          getOperator(e);      
        } else {
          calculation.secondNum = currentValue;
          currentValue = '';
          let result = calculateResult();
          calculation.firstNum = result;
          getOperator(e);
        }
      // Choose another operator if already have chosen one
      } else if (!currentValue && displayedValue.textContent) {
        displayedValue.textContent = displayedValue.textContent.slice(0, -1);
        getOperator(e);
      }
    });
  });
}

inputOperators();


let resulted = false;

function outputResult() {
  equalBtn.addEventListener('click', (e) => {
    if (calculation.firstNum && currentValue && calculation.operator) {
      calculation.secondNum = currentValue;
      let result = calculateResult();
      resulted = true;
      currentValue = result;
      calculation.operator = null;
    }
  });
}

outputResult();


let point = false;

function inputPoint() {
  pointBtn.addEventListener('click', (e) => {
    if (!point) {
      if (!currentValue) {
        displayedValue.textContent += 0 + e.target.textContent;
        currentValue += 0 + e.target.textContent;
        point = true;
      } else {
        displayedValue.textContent += e.target.textContent;
        currentValue += e.target.textContent;
        point = true;
        resulted = false;
      }
    }
  });
}

inputPoint();


function clearEverything() {
  clearBtn.addEventListener('click', (e) => {
    displayedValue.textContent = '';
    currentValue = '';
    calculation.firstNum = null;
    calculation.operator = null;
    point = false;
    resulted = false;
  });
}

clearEverything();


function multiplyByMinusOne() {
  plusMinusBtn.addEventListener('click', (e) => {
    if (currentValue && currentValue !== '0' && !calculation.firstNum) {
      currentValue *= -1;
      currentValue = currentValue.toString();
      displayedValue.textContent = currentValue;
    }
  });
}

multiplyByMinusOne();


function calculatePercentage() {
  percentageBtn.addEventListener('click', (e) => {
    if (currentValue && currentValue !== '0') {
      displayedValue.textContent = displayedValue.textContent.slice(0, -currentValue.length);
      currentValue /= 100;
      currentValue = currentValue.toString();
      if (currentValue.includes('.')) {
        point = true;
      }
      displayedValue.textContent += currentValue;
    }
  });
}

calculatePercentage();


function deleteChar() {
  deleteBtn.addEventListener('click', (e) => {
    if (currentValue) {
      currentValue = currentValue.slice(0, -1);
      displayedValue.textContent = displayedValue.textContent.slice(0, -1);
      resulted = false;
    } else if (!currentValue && calculation.firstNum) {
      currentValue = calculation.firstNum;
      calculation.firstNum = null;
      calculation.operator = null;
      displayedValue.textContent = displayedValue.textContent.slice(0, -1);
    }
  });
}

deleteChar();