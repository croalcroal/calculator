const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

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
	//Assign firstValue if no first value
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		console.log('current value', currentValue);
	}
	// Ready for next value, store operator
	awaitingNextValue = true;

	operatorValue = operator;
	console.log('first value', firstValue);
	console.log('operator', operator);
}

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

// Reset Display
function resetAll() {
	calculatorDisplay.textContent = '0';
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
}

// Event listener
clearBtn.addEventListener('click', resetAll);