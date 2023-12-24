const calcCurrent = {
    firstNum: null,
    secondNum: null,
    operator: null,
    operatorShowing: false,
    decimalButtonPressed: false,
    surpriseIndex: 0
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
const decimalBtn = document.querySelector('#dot');
const surpriseBtn = document.querySelector('#surprise');
const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operation');
const buttons = document.querySelectorAll('button');
const calcScreen = document.querySelector('#calc-screen');
const surprise = ["Happiness can be found", "even in the darkest of times", "if only one remembers",
    "to turn on the light"];

buttons.forEach(btn => btn.addEventListener('click', (e) => {
    if (e.target.textContent != '?' && calcCurrent.surpriseIndex != 0) {
        clearBtn.click();
        calcCurrent.surpriseIndex = 0;
        calcScreen.style.backgroundColor = "#4a4949";
    }
}));

numBtns.forEach(numBtn => numBtn.addEventListener('click', () => {
    if (bottomScreen.textContent === "bruh") {
        calcCurrent.secondNum = '';
    }
    if (bottomScreen.textContent != null) {
        if (bottomScreen.textContent.length >= 12 && (!calcCurrent.operatorShowing || calcCurrent.secondNum != null)) {
            return;
        }
    }
    if (calcCurrent.firstNum != null) {
        if (calcCurrent.operator != null || calcCurrent.secondNum != null) {
            calcCurrent.secondNum == null ? calcCurrent.secondNum = numBtn.textContent :
                calcCurrent.secondNum += numBtn.textContent;
            calcCurrent.operatorShowing = false;
            updateDisplaySecondNum();
            return;
        } else {
            calcCurrent.firstNum += numBtn.textContent;
        }
    } else {
        calcCurrent.firstNum = numBtn.textContent;
    }
    calcCurrent.operatorShowing = false;
    updateDisplayFirstNum();
}));

function updateDisplayFirstNum() {
    topScreen.textContent = calcCurrent.firstNum;
    bottomScreen.textContent = calcCurrent.firstNum;
}

function updateDisplaySecondNum() {
    topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
    bottomScreen.textContent = calcCurrent.secondNum;
}

operatorBtns.forEach(opBtn => opBtn.addEventListener('click', () => {
    if (calcCurrent.secondNum == null && calcCurrent.firstNum === '-') {
        return;
    }
    if (calcCurrent.operator === '÷' && calcCurrent.secondNum == 0) {
        bottomScreen.textContent = "bruh";
        return;
    }
    if (opBtn.textContent != '=') {
        calcCurrent.operatorShowing = true;
    }
    if (opBtn.textContent === '-') {
        if (!handleMinus()) {
            return;
        }
    }
    if (calcCurrent.secondNum == null) {
        if (calcCurrent.firstNum != null && opBtn.textContent != '=') {
            calcCurrent.operator = opBtn.textContent;
            topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator;
        }
    } else {
        calculateAndDisplay(opBtn);
        return;
    }
    calcCurrent.decimalButtonPressed = false;
}));

function handleMinus() {
    if (calcCurrent.firstNum === '-' || calcCurrent.secondNum === '-') {
        return 0;
    }
    else if (calcCurrent.firstNum == null) {
        calcCurrent.firstNum = '-';
        topScreen.textContent = '-';
        bottomScreen.textContent = '-';
        return 0;
    } else if (calcCurrent.secondNum == null && calcCurrent.operator != null) {
        calcCurrent.secondNum = '-';
        topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
        bottomScreen.textContent = '-';
        return 0;
    }
    return 1;
}

function calculateAndDisplay(opBtn) {
    let result = calcExpression(Number(calcCurrent.firstNum), Number(calcCurrent.secondNum),
        calcCurrent.operator);
    result = result.toString().length < 12 ? result : result.toFixed(2).toString().length < 12 ? result.toFixed(2) :
        result.toExponential(2).toString().length < 12 ? result.toExponential(2) : Infinity;
    if (opBtn.textContent === '=') {
        if (topScreen.textContent.search('=') === '-1') {
            return;
        }
        topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum +
            ' = ' + result;
        calcCurrent.operator = null;
    } else {
        calcCurrent.operator = opBtn.textContent;
        topScreen.textContent = result + ' ' + calcCurrent.operator;
    }
    calcCurrent.firstNum = result;
    bottomScreen.textContent = result;
    calcCurrent.secondNum = null;
    if (result.toString().includes('.')) {
        calcCurrent.decimalButtonPressed = true;
    }
}

function calcExpression(a, b, operator) {
    switch (operator) {
        case '%':
            return modulo(a, b);
        case '+':
            return add(a, b);
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

decimalBtn.addEventListener('click', () => {
    if (!calcCurrent.decimalButtonPressed) {
        if (calcCurrent.secondNum != null || calcCurrent.operatorShowing) {
            if (calcCurrent.secondNum != null && calcCurrent.secondNum != '-') {
                calcCurrent.secondNum += '.';
            }
            else if (calcCurrent.secondNum === '-') {
                calcCurrent.secondNum += '0.';
            }
            else {
                calcCurrent.secondNum = '0.';
            }
            updateDisplaySecondNum();
        } else {
            if (calcCurrent.firstNum == null) {
                calcCurrent.firstNum = '0.';
            } else {
                calcCurrent.firstNum += '.';
            }
            updateDisplayFirstNum();
        }
    }
    calcCurrent.decimalButtonPressed = true;
});

clearBtn.addEventListener('click', () => {
    calcCurrent.firstNum = null, calcCurrent.secondNum = null, calcCurrent.operator = null;
    calcCurrent.operatorShowing = false, calcCurrent.decimalButtonPressed = false;
    topScreen.textContent = '', bottomScreen.textContent = '';
});

deleteBtn.addEventListener('click', () => {
    if (!calcCurrent.operatorShowing) {
        if (calcCurrent.secondNum != null) {
            calcCurrent.secondNum = Number(calcCurrent.secondNum.toString().slice(0, -1));
            if (calcCurrent.secondNum === 0) {
                calcCurrent.secondNum = '';
            }
            updateDisplaySecondNum();
        } else if (calcCurrent.firstNum != null) {
            calcCurrent.firstNum = Number(calcCurrent.firstNum.toString().slice(0, -1));
            if (calcCurrent.firstNum === 0) {
                calcCurrent.firstNum = '';
            }
            updateDisplayFirstNum();
        }
    }
});

surpriseBtn.addEventListener('click', () => {
    if (calcCurrent.surpriseIndex >= 3) {
        if (calcCurrent.surpriseIndex === 3) {
            calcScreen.style.backgroundColor = "yellow";
        } else {
            calcCurrent.surpriseIndex = 0;
            calcScreen.style.backgroundColor = "#4a4949";
        }
    }
    topScreen.textContent = surprise[calcCurrent.surpriseIndex];
    calcCurrent.surpriseIndex++;
});