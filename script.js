const calcCurrent = {
    firstNum: null,
    secondNum: null,
    operator: null,
    upperDisplay: null,
    lowerDisplay: null,
    operatorShowing: false,
    dotButtonPressed: false
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
// !!!!! might not need these next two lines, and instead just const numBtns = document.querySelectorAll('.number') !!!!!
const numBtns = Array.from(document.querySelectorAll('.number'));
numBtns.unshift(numBtns.pop());
const operatorBtns = document.querySelectorAll('.operation');

numBtns.forEach(numBtn => numBtn.addEventListener('click', () => {
    if (calcCurrent.firstNum != null) {
        if (calcCurrent.operator != null) {
            calcCurrent.secondNum == null ? calcCurrent.secondNum = numBtn.textContent :
                calcCurrent.secondNum.concat(numBtn.textContent);
            calcCurrent.upperDisplay = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
            return;
        } else {
            calcCurrent.firstNum.concat(numBtn.textContent);
        }
    } else {
        calcCurrent.firstNum = numBtn.textContent;
    }
    calcCurrent.operatorShowing = false;
    calcCurrent.upperDisplay = calcCurrent.firstNum;
    calcCurrent.lowerDisplay = calcCurrent.firstNum;
    updateDisplay();
}));

operatorBtns.forEach(opBtn => opBtn.addEventListener('click', () => {
    if (calcCurrent.secondNum == null) {
        if ((calcCurrent.firstNum != null) && (calcCurrent.operator != '=')) {
            calcCurrent.operator = opBtn.textContent;
            calcCurrent.upperDisplay = calcCurrent.firstNum + ' ' + calcCurrent.operator;
            calcCurrent.lowerDisplay = calcCurrent.upperDisplay;
            calcCurrent.operatorShowing = true;
            calcCurrent.dotButtonPressed = false;
        }
    } else {
        const result = String(calcExpression(Number(calcCurrent.firstNum), Number(calcCurrent.secondNum),
            calcCurrent.operator));
        if (opBtn = '=') {
            calcCurrent.upperDisplay = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum +
                ' = ' + result;
        } else {
            calcCurrent.upperDisplay = result + ' ' + calcCurrent.operator;
            calcCurrent.operatorShowing = true;
        }
        calcCurrent.firstNum = result;
        calcCurrent.lowerDisplay = result;
        calcCurrent.secondNum = null;
        calcCurrent.dotButtonPressed = false;
    }
    updateDisplay();
}));

function calcExpression(a, b, operator) {
    switch (operator) {
        case '%':
            return modulo(a, b);
        case '+':
            return modulo(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '-':
            return subtract(a, b);
    }
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

function updateDisplay() {
    topScreen.textContent = calcCurrent.upperDisplay;
    bottomScreen.textContent = calcCurrent.bottomScreen;
}

dotBtn.addEventListener('click', () => {
    if (!calcCurrent.dotButtonPressed) {
        if (calcCurrent.secondNum != null) {
            calcCurrent.secondNum.concat('.');
            calcCurrent.upperDisplay = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
            calcCurrent.lowerDisplay = calcCurrent.secondNum;
        } else {
            if (calcCurrent.firstNum == null) {
                calcCurrent.firstNum = '0.';
                calcCurrent.upperDisplay = calcCurrent.firstNum;
                calcCurrent.lowerDisplay = calcCurrent.firstNum;
            } else if (!calcCurrent.operatorShowing) {
                calcCurrent.firstNum.concat('.');
                calcCurrent.upperDisplay = firstNum;
                calcCurrent.lowerDisplay = firstNum;
            }
        }
        if (!calcCurrent.operatorShowing) {
            calcCurrent.dotButtonPressed = true;
        }
        updateDisplay();
    }
});