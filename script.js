const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values, depending on operator
const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
	// Replace current display value if first value is entered
	if (awaitingNextValue) {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	} else {
		// if current display value is 0, replace it, if not add number
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
	}
}

function addDecimal() {
	// if operator pressed don't add decimal
	if (awaitingNextValue) {
		return;
	}
	// if no decimal add one
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}

function useOperator(operator) {
	const currentValue = Number(calculatorDisplay.textContent);
	// Prevent multiple operators, will break out and not run the rest.
	if (operatorValue && awaitingNextValue) {
		// set operator value to whatever was last pressed. ie, press minus, but change mind to plus. and or equal to something else...
		operatorValue = operator;
		return;
	}
	//Assign firstValue if no first value
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}
	// Ready for next value, store operator
	awaitingNextValue = true;
	operatorValue = operator;
}

// Reset Display
function resetAll() {
	calculatorDisplay.textContent = '0';
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
}

// Event listeners
// Add event listeners for numbers / operators and decimal btns
inputBtns.forEach((inputBtn) => {
	// Number btns
	if (inputBtn.classList.length === 0) {
		inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
	} else if (inputBtn.classList.contains('operator')) {
		inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
	} else if (inputBtn.classList.contains('decimal')) {
		inputBtn.addEventListener('click', () => addDecimal());
	}
});

clearBtn.addEventListener('click', resetAll);