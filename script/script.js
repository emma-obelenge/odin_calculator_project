const calculatorButton = document.querySelector("#calc-button-container");
const calculatorScreen = document.querySelector("#calc-screen-text");
const equalToButton = document.querySelector("#equal-to-button");
const screenDisplay = document.querySelector("#calc-screen-text");

// creating variables
let equals = null;
let operator = null;
let value1 = null;
let value2 = null;
let currentValue = null;
let inputLimit = 12;
let userInputArray = [];
let numbers = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
                "seven": 7, "eight": 8, "nine": 9};

let operators = ["subtract", "add", "divide", "multiply"];

// the calculator Handler
function calculatorHandler(operator, value1, value2) {
    switch(operator) {
        case "add":
            return(add(value1, value2));
        case "subtract":
            return(subtract(value1, value2));
        case "multiply":
            return(multiply(value1, value2));
        case "divide":
            return(divide(value1, value2));
    }
}

// function to clear the screen
function clearScreen() {
    elementsToDelete = screenDisplay.querySelectorAll("span");
    elementsToDelete.forEach(element => {
        element.remove();
    });
}

// function to reset calculator
function resetCalculator() {
    clearScreen();
    equals = null;
    operator = null;
    value1 = null;
    value2 = null;
    currentValue = null;
    inputLimit = 12;
    userInputArray = [];
}

// function handling the calculator logic
function calculatorLogic(event) {
    let targetId = event.target.id;
    if(targetId == "clear-button") {
        resetCalculator();
        return;
    }
    if(targetId in numbers) {
        if(inputLimit > 0) {
            if(userInputArray.length < 1 && screenDisplay.querySelector("span")) {
                clearScreen();
            }
            let newNumber = document.createElement("span");
            newNumber.textContent = numbers[targetId];
            newNumber.setAttribute("class", "digit");
            calculatorScreen.appendChild(newNumber);
            userInputArray.push(newNumber.textContent)
            inputLimit--;
        }
    } else if(operators.includes(targetId) || (targetId === "equal-to-button")) {
        inputLimit = 12;
        currentValue = parseFloat(userInputArray.join(""));
        userInputArray = [];

        // setting up value1 and value2
        if(value1 == null) {
            value1 = currentValue;
            currentValue = null;
        } else if(value1 && (value2 == null)) {
            if(currentValue) {
                value2 = currentValue;
            } else {
                operator = targetId;
                return;
            }
            currentValue = null;
        }

        // utilizing the previous operator entered by the user if any
        if(operator) {
            value1 = calculatorHandler(operator, value1, value2);
            value2 = null;
        }
        operator = targetId;

        // checking if user now entered the "=" operator for final result
        if(operator === "equal-to-button") {
            if(!value1) {return};
            clearScreen();
            let finalAnswer = document.createElement("span");
            finalAnswer.textContent = value1;
            finalAnswer.setAttribute("class", "digit");
            calculatorScreen.appendChild(finalAnswer);
        }
    }
}

// event listeners
calculatorButton.addEventListener("click", (event) => {
    calculatorLogic(event);
})

equalToButton.addEventListener("click", (event) => {
    calculatorLogic(event);
})

// addition function
const add = function(value1, value2) {
    return(value1 + value2);
};

// subtraction function
const subtract = function(value1, value2) {
    return(value1 - value2);
};

// multiplication function
const multiply = function(value1, value2) {
    return(value1 * value2);
};

// division function
const divide = function(value1, value2) {
    return(value1 / value2);
};

// module.exports = {
//     add,
//     subtract,
//     sum,
//     multiply,
//   };
  