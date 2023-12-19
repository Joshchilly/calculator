const calcCurrent = {
    firstNum: null,
    secondNum: null,
    operator: null,
    operatorClicked: false,
    displayExpression: null,
};

const topScreen = document.querySelector('#top-screen');
const bottomScreen = document.querySelector('#bottom-screen');
const clearBtn = document.querySelector('#ac');
const deleteBtn = document.querySelector('#delete');
const moduloBtn = document.querySelector('#modulo');
const addBtn = document.querySelector('#add');
const multiplyBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divide');
const subtractBtn = document.querySelector('#subtract');
const dotBtn = document.querySelector('#dot');
const surpriseBtn = document.querySelector('#surprise');

// Our number buttons are almost ordered in HTML file -> NodeList is almost ordered -> buttons array is almost ordered
const numBtnArray = Array.from(document.querySelectorAll('.number'));
numBtnArray.unshift(numBtnArray.pop());

numBtnArray.forEach(btn => btn.addEventListener('click', () => {
    
}));

function updateDisplay() {

}

function modulo(a, b) {
    return a % b;
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function subtract(a, b) {
    return a - b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '-':
            return subtract(a, b);
        case '%':
            return modulo(a, b);
    }
}