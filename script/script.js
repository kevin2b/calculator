const MAX_DIGIT = 9;
const MAX_SCIENTIFIC = 7;
let num1;
let op;
let num2;
let operator;
let equality;
let resetAfterEnterNum;

const container = document.querySelector("#container");
const display = document.querySelector("#display");
const operatorDictionary = {
	"add": "+",
	"minus": "-",
	"multiply": "*",
	"divide": "/",
};

initialize();

container.addEventListener("click", (e)=> {
	const classList = e.target.classList;
	
	if (classList.contains("number")){
		handleNumber(e);
		return;
	}
	
	//Reset everything to initial state
	if (e.target.id === "reset"){
		initialize();
		return;
	}
	
	if (operator && classList.contains("operator")){
		handleOperator(e);
		return;
	}
	
	if (equality && classList.contains("equality")){
		const sol = operate(num1, op, num2);
		storeSolution(sol);
		
		//Users can either enter number to reset display or enter operator to use answer as first number
		equality = false;
		resetAfterEnterNum = true;
		return;
	}
});

function operate (firstNum, operator, secondNum){
	switch(operator){
		case "+":
			return {"ans": firstNum + secondNum, "divError": false};
		case "-":
			return {"ans": firstNum - secondNum, "divError": false};
		case "/":
			if (secondNum === 0){
				return {"ans": NaN, "divError": true};
			}
			return {"ans": firstNum / secondNum, "divError": false};
		case "*":
			return {"ans": firstNum * secondNum, "divError": false};
		default:
			break;
	}
}

function initialize(){
	num1 = 0;
	op = null;
	num2 = null;
	operator = true;
	equality = false;
	resetAfterEnterNum = false;
	display.textContent = num1;
}

//If a number is clicked, either append to the display number or use it instead of the default display number of 0
function handleNumber (e){
	
	if (resetAfterEnterNum){
		initialize();
	}
	
	const num = e.target.textContent.trim();

	//Handle first number in expression
	if (op === null){
		if (String(num1).length < MAX_DIGIT){
			if (num1 === 0){
				num1 = +num;
			}
			else {
				num1 = +(num1 + num);
			}
		}
		display.textContent = formatOutput(num1);
		return;
	}

	//Handle second number in expression. Allow equality button to be used because second number is defined.
	if (num2 == null || String(num2).length < MAX_DIGIT){
		if (num2 === null){
			num2 = +num;
		}
		else if (num2 === 0){
			num2 = +num;
		}
		else {
			num2 = +(num2 + num);
		}
		equality = true;
		display.textContent = formatOutput(num2);
		return;
	}
}


function handleOperator(e){
	//Disable equal button
	equality = false;
	
	//If after valid equal button and user hits operator, assume user wants to use result as first number in expression
	if (resetAfterEnterNum){
		resetAfterEnterNum = false;
	}
	
	//If there are two numbers already, do the operation before setting operator
	if (num2 !== null){
		const sol = operate(num1, op, num2);
		storeSolution(sol);
	}
	
	//Change operator
	op = operatorDictionary[e.target.id];
}

function storeSolution(sol){
	//A divide by 0 error forces user to reset expression
	if (sol.divError){
		display.textContent = "Div By 0";
		operator = false;
		resetAfterEnterNum = true;
		return;
	}
	num1 = +sol.ans;
	op = null;
	num2 = null;
	display.textContent = formatOutput(num1);
}

//Format output to stay within display by either scientific notation or truncation
function formatOutput(num){
	const RESERVED_SCIENTIFIC_DIGIT = 7;
	//For converting to scientific if number is too big or small
	let maxNum = "9";
	let minNum = "0."
	
	//Need an extra "-1" for MAX_DIGIT to account for possible negative sign
	for (let i = 0; i < MAX_DIGIT - 2; i++){
		maxNum += "9";
	}
	
	//Have 3 numbers created by default out of this loop, need extra -1 to account for possible negative sign
	for (let i = 0; i < MAX_DIGIT - 4; i++){
		minNum += "0";
	}
	minNum += "1";
	
	if (Math.abs(num) >  +maxNum || (Math.abs(num) < +minNum && num !== 0)){
		return num.toExponential(MAX_DIGIT - RESERVED_SCIENTIFIC_DIGIT);
	}
	
	const numLength = String(num).length;
	if (numLength > MAX_DIGIT){
		return num.toFixed(MAX_DIGIT - (String(num).indexOf(".") + 1));
	}
	return num;
}
