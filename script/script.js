const MAX_DIGIT = 9;
let num1;
let op;
let num2;
let operator;
let equality;
let resetAfterEnterNum;

const container = document.querySelector("#container");
const display = document.querySelector("#display");

initialize();

container.addEventListener("click", (e)=> {
	let classList = e.target.classList;
	
	if (classList.contains("number")){
		handleNumber(e);
	}
	//Reset everything to initial state
	else if (e.target.id === "reset"){
		initialize();
	}
	else if (operator && classList.contains("operator")){
		handleOperator(e);
	}
	else if (equality && classList.contains("equality")){
		const sol = operate(num1, op, num2);
		storeSolution(sol);
		
		//Users can either enter number to reset display or enter operator to use answer as first number
		equality = false;
		resetAfterEnterNum = true;
	}
	
	return;
});

function operate (firstNum, operator, secondNum){
	if (operator === "+"){
		return {"ans": firstNum + secondNum, "divError": false};
	}
	else if (operator === "-"){
		return {"ans": firstNum - secondNum, "divError": false};
	}
	else if (operator === "/"){
		if (secondNum === 0){
			return {"ans": NaN, "divError": true};
		}
		return {"ans": firstNum / secondNum, "divError": false};
	}
	else {
		return {"ans": firstNum * secondNum, "divError": false};
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
	
	let num = e.target.textContent.trim();

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
		display.textContent = num1;
	}

	//Handle second number in expression. Allow equality button to be used because second number is defined.
	else{
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
		}
		equality = true;
		display.textContent = num2;
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
	if (e.target.id === "add"){
		op = "+";
	}
	else if (e.target.id === "minus"){
		op = "-";
	}
	else if (e.target.id === "multiply"){
		op = "*";
	}
	else if (e.target.id === "divide"){
		op = "/";
	}
	return;
}

function storeSolution(sol){
	//A divide by 0 error forces user to reset expression
	if (sol.divError){
		display.textContent = "Div By 0";
		operator = false;
		resetAfterEnterNum = true;
	}
	else{
		num1 = +sol.ans;
		op = null;
		num2 = null;
		display.textContent = num1;
	}
	return;
}
