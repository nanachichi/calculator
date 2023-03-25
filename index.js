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
const numbers = document.querySelectorAll('.number');

let currentValue = '';
numbers.forEach(number => {
  number.addEventListener('click', (e) => {
    displayedValue.textContent += e.target.textContent;
    currentValue += e.target.textContent;
  });
});