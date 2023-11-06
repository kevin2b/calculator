# calculator
Project from The Odin Project to create a basic calculator.

## Definition
1. A/C is Reset Button.
1. The buttons \0-9 are Number Buttons.
1. The "+", "-". "/" and "\*" buttons are Operator Buttons.
1. The "=" key is Equality Button.

## Behaviour
- The Reset Button can be used at any time to reset the calculator to initial state.
- Number Buttons can be used in initial state or after hitting an Operator Button to add numbers to the display. Hitting a Number Button after Equality or "Divide by zero" error will reset the current expression and set the number selected.
- Operator Buttons can be used if there is a number on the display.
- Equality Button can be used if a number is entered after an Operator Button is used.
- Solution from previous operation can carry over using the Operator Button. (The solution becomes the first number in the expression.)

## Truncation
Numbers will be truncated or converted to scientific notation if it gets too big for display.
