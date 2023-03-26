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
        return operations.add(this.firstNum, this.secondNum);
      case '-':
        return operations.subtract(this.firstNum, this.secondNum);
      case '*':
        return operations.multiply(this.firstNum, this.secondNum);
      case '/':
        let result = operations.divide(this.firstNum, this.secondNum);
        return result === Infinity || result === -Infinity ? 'nope' : result; // can't divide by zero
    }
  }
};


function calculateResult() { // calculates and shows calculated result
  let result = calculation.operate();
  displayedValue.textContent = result;
  calculation.firstNum = null;
  calculation.secondNum = null;
  return result;
}


function getOperator(e) {
  calculation.operator = operators[e.target.id];
  displayedValue.textContent += operators[e.target.id];
}


const displayedValue = document.querySelector('.display .value');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');


let currentValue = '';

function inputNumbers() {
  numberBtns.forEach(number => {
    number.addEventListener('click', (e) => {
      if (resulted) {
        displayedValue.textContent = e.target.textContent;
        currentValue = e.target.textContent;
        resulted = false;
      } else {
        displayedValue.textContent += e.target.textContent;
        currentValue += e.target.textContent;
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
        if (!calculation.firstNum && calculation.firstNum !== 0) {
          calculation.firstNum = Number(currentValue);
          currentValue = '';
          getOperator(e);      
        } else if ((calculation.firstNum || calculation.firstNum === 0)) {
          calculation.secondNum = Number(currentValue);
          currentValue = '';
          let result = calculateResult();
          calculation.firstNum = Number(result);
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
    if ((calculation.firstNum || calculation.firstNum === 0) && currentValue && calculation.operator) {
      calculation.secondNum = Number(currentValue);
      calculateResult();
      resulted = true;
      calculation.operator = null;
    }
  });
}

outputResult();