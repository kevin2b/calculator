const MAX_DIGIT = 9;
let num1;
let op;
let num2;
let operator;
let equality;

const container = document.querySelector("#container");
const display = document.querySelector("#display");

initialize();

container.addEventListener("click", (e)=> {
	let classList = e.target.classList;
	
	//If a number is clicked, either append to the display number or use it instead of the default display number of 0
	if (classList.contains("number")){
		let num = e.target.textContent.trim();
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
	
	//Reset everything to initial state
	else if (e.target.id === "reset"){
		initialize();
	}
	
	return;
});


function initialize(){
	num1 = 0;
	op = null;
	num2 = null;
	operator = true;
	equality = false;
	display.textContent = num1;
}
