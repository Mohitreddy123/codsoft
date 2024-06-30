const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            handleNumber(value);
        } else {
            handleOperator(value);
        }

        updateDisplay();
    });
});

function handleNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
}

function handleOperator(op) {
    if (op === 'C') {
        currentInput = '';
        previousInput = '';
        operator = '';
    } else if (op === '=') {
        if (currentInput !== '' && previousInput !== '') {
            currentInput = calculate(previousInput, currentInput, operator);
            previousInput = '';
            operator = '';
        }
    } else {
        if (currentInput !== '') {
            if (previousInput === '') {
                previousInput = currentInput;
                currentInput = '';
            } else {
                previousInput = calculate(previousInput, currentInput, operator);
                currentInput = '';
            }
        }
        operator = op;
    }
}

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (op === '+') return (a + b).toString();
    if (op === '-') return (a - b).toString();
    if (op === '*') return (a * b).toString();
    if (op === '/') return (a / b).toString();
}

function updateDisplay() {
    display.textContent = currentInput || previousInput || '0';
}
