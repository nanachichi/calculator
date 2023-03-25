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
        return operations.divide(this.firstNum, this.secondNum);
    }
  }
};

const displayedValue = document.querySelector('.display .value');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

// Input numbers
let currentValue = '';
numberBtns.forEach(number => {
  number.addEventListener('click', (e) => {
    displayedValue.textContent += e.target.textContent;
    currentValue += e.target.textContent;
  });
});

// Input operators
operatorBtns.forEach(operator => {
  operator.addEventListener('click', (e) => {
    if (currentValue) {
      
      // get firstNum / secondNum, and operator;
      if (!calculation.firstNum && calculation.firstNum !== 0) {
        calculation.firstNum = Number(currentValue);
        currentValue = '';
        calculation.operator = operators[e.target.id];
        displayedValue.textContent += operators[e.target.id];
      } else if (calculation.firstNum || calculation.firstNum === 0) { // if already firstNum, get secondNum instead and calculate the result
        calculation.secondNum = Number(currentValue);
        currentValue = '';
        // get result;
        let result = calculation.operate();
        displayedValue.textContent = result;
        calculation.firstNum = result;
        calculation.secondNum = null;

        calculation.operator = operators[e.target.id];
        displayedValue.textContent += operators[e.target.id];
      }
    }
  });
});

