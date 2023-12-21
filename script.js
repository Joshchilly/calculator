const calcCurrent = {
    firstNum: null,
    secondNum: null,
    operator: null,
    operatorShowing: false,
    dotButtonPressed: false,
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
    if (bottomScreen.textContent != null) {
        if (bottomScreen.textContent.length === 12) {
            return;
        }
    }
    if (calcCurrent.firstNum != null) {
        if (calcCurrent.operator != null) {
            calcCurrent.secondNum == null ? calcCurrent.secondNum = numBtn.textContent :
                calcCurrent.secondNum += numBtn.textContent;
            topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
            bottomScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
            return;
        } else {
            calcCurrent.firstNum += numBtn.textContent;
        }
    } else {
        calcCurrent.firstNum = numBtn.textContent;
    }
    calcCurrent.operatorShowing = false;
    topScreen.textContent = calcCurrent.firstNum;
    bottomScreen.textContent = calcCurrent.firstNum;
}));

operatorBtns.forEach(opBtn => opBtn.addEventListener('click', () => {
    if (calcCurrent.secondNum == null) {
        if ((calcCurrent.firstNum != null) && (calcCurrent.operator != '=')) {
            calcCurrent.operator = opBtn.textContent;
            topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator;
            bottomScreen.textContent = topScreen.textContent;
            calcCurrent.operatorShowing = true;
        }
    } else {
        let result = calcExpression(Number(calcCurrent.firstNum), Number(calcCurrent.secondNum),
            calcCurrent.operator);
        if (result % 1 != 0) {
            result = result.toFixed(5);
        }
        if (opBtn = '=') {
            topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum +
                ' = ' + result;
        } else {
            topScreen.textContent = result + ' ' + calcCurrent.operator;
            calcCurrent.operatorShowing = true;
        }
        calcCurrent.firstNum = result;
        bottomScreen.textContent = result;
        calcCurrent.secondNum = null;
    }
    calcCurrent.dotButtonPressed = false;
}));

dotBtn.addEventListener('click', () => {
    if (!calcCurrent.dotButtonPressed) {
        if (calcCurrent.secondNum != null) {
            calcCurrent.secondNum += '.';
            topScreen.textContent = calcCurrent.firstNum + ' ' + calcCurrent.operator + ' ' + calcCurrent.secondNum;
            bottomScreen.textContent = calcCurrent.secondNum;
        } else {
            if (calcCurrent.firstNum == null) {
                calcCurrent.firstNum = '0.';
                topScreen.textContent = calcCurrent.firstNum;
                bottomScreen.textContent = calcCurrent.firstNum;
            } else if (!calcCurrent.operatorShowing) {
                calcCurrent.firstNum += '.';
                topScreen.textContent = firstNum;
                bottomScreen.textContent = firstNum;
            }
        }
        if (!calcCurrent.operatorShowing) {
            calcCurrent.dotButtonPressed = true;
        }
    }
});

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