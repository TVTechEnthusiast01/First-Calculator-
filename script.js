"use strict"

class calculatorOperation {

    // takes all the inputs and functinos for calculator
    constructor(previousOperandTextElement, currentOperandTextElement) {

        // set elements inside of calculator class
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

        // default values to clear when new calculator created
        this.clear()
    }

    // define the functions of the calculator

    // clear out variables on the screen
    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined

    }
    // remove a single number
    delete() {
        // obtain the last value from the current operand by converting it to a string and chop it off
        this.currentOperand = this.currentOperand.toString().slice(0, -1) //index 0 to -1 at the end 2nd to last nubmer
    }

    // adds a clicked number to the screen and appends 1 or more numbers afterwards
    appendnumber(number) {
        // prevent certain numbers from being used more than once e.g .
        if (number === '.' && this.currentOperand.includes('.')) return

        // convert to string incase its a number and easily append using + / JS will try add numbers e.g 1+1=2 sinetad of 1+1=11 numbers need to be appended not added
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    // anytime user clicks on a operation it clears the current operation to type a new number
    chooseOperation(operation) {
        // if the output is empty it will not execute any further
        if (this.currentOperand === '') return

        // if there are numbers using an operation should compute a new value based on the existing numbers
        if (this.previousOperand !== '') {
            this.compute()
        }

        // have the current operation value be taken into the prevoius operation value when a new operation is used
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // computes selected values to display
    compute() {
        // result of computation
        let computation

        // converting strings to numbers
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        // check if there is no previous value to prevent an empty operation by cancelling it immediately
        if (isNaN(prev) || isNaN(current)) return

        // using switch statement to allow multiple if statements (case) on a single object
        switch (this.operation) {
            case '+':
                computation = prev + current
                // not to follow any other case statements
                break

            case '-':
                computation = prev - current
                // not to follow any other case statements
                break

            case '*':
                computation = prev * current
                // not to follow any other case statements
                break

            case '÷':
                computation = prev / current
                // not to follow any other case statements
                break

            //define the else statement / return nothing as no computation is done
            default:
                return
        }
        //results of the computation
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""

    }

    // helper function to help display large numbers with breakpoints
    getDisplayNumber(number) {

        // return number
        //to parse numbers which are not numbers e.g . / split the display number to have a number before and after .
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // obtain the first part before the period character 
        const decimalDigits = stringNumber.split('.')[1] // obtain the second part after the period character 

        //get integer display separately 
        let integerDisplay
        if (isNaN(integerDigits)) { // if not a number anytime a value is inputted
            integerDisplay = ''
        }
        else {
            // can never be any decimals after this value when it is converted to a string
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        // if the decimal digits is not null we should display the operand and decimal
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}` // back ticks required to concatenate the string
        } else {
            return integerDisplay
        }

    }


    // updates values inside of output
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand) //any changes made in this value are going to be displayed in the previous and current operand

        // if the operation is not null we want to display the concatenated operation with the decimal number
        if (this.operation != null) {


            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = '' // calculated operands will clear from the previous display
        }

    }

}




// provide all elements that match a certain string
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

// provide single element instead of multiple
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// create calculator
const calculator = new calculatorOperation(previousOperandTextElement, currentOperandTextElement)

// select buttons with numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.updateDisplay()

    })
})

// select buttons with operations
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})
// select button with equals value
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// select button with all clear
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// select button with all delete
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


