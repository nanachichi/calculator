function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const calculation = {
  firstNum: null,
  secondNum: null,
  operator: null,
  operate() {
    switch (this.operator) {
      case '+':
        return add(this.firstNum, this.secondNum);
      case '-':
        return subtract(this.firstNum, this.secondNum);
      case '*':
        return multiply(this.firstNum, this.secondNum);
      case '/':
        return divide(this.firstNum, this.secondNum);
    }
  }
}