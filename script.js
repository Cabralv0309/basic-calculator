import { evaluate } from "https://cdn.jsdelivr.net/npm/mathjs@14.8.1/+esm";

const display = document.getElementById('display');



//show numbers on display
const btnNumbers = document.querySelectorAll('.number');
btnNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        let number = btn.dataset.value;
        
        if (display.innerText === '0' || display.innerText === 'Err') {
            display.innerText = number;
        } else{
            display.innerText += number;
        }
    });
});

//adds operators to the display string
const btnOperators = document.querySelectorAll('.operation');
btnOperators.forEach(btn => {
    btn.addEventListener('click', () => {
        if (
            display.innerText.at(-1) == '+' ||
            display.innerText.at(-1) == '-' ||
            display.innerText.at(-1) == 'x' ||
            display.innerText.at(-1) == '÷' ||
            display.innerText.at(-1) == comma.dataset.value
        ) {
            display.innerText = display.innerText.slice(0,-1); 
            display.innerText += btn.dataset.value;
        } else {
            display.innerText += btn.dataset.value;
        }
    })
})


//AC logic
const clear = document.getElementById('ac');
clear.addEventListener('click', () => {
    display.innerText = '0';
})

//backspace logic
const del = document.getElementById('backspace');
del.addEventListener('click', () => {
    display.innerText = display.innerText.slice(0,-1);
    if (display.innerText.length == 0){
        display.innerText = '0';
    }
})

//comma logic
const comma = document.getElementById('comma');
comma.addEventListener('click', () => {
    let memory = display.innerText.split(/([\+\-x÷])/);
    let cm = comma.dataset.value;
    let lastNumber = memory.at(-1);
    if (!lastNumber.includes(cm) && lastNumber !== ''){
        display.innerText = display.innerText + cm;
    }
})

//percent logic
const percent = document.getElementById('percent');
percent.addEventListener('click', () => {
    let memory = display.innerText.split(/([\+\-x÷])/);
    let lastNumber = memory.at(-1);
    
    if (lastNumber !== '') {
        lastNumber = lastNumber.replace(',','.');
        lastNumber = Number(lastNumber)/100;
        lastNumber = String(lastNumber).replace('.',',');
    }
    memory[memory.length-1] = lastNumber;
    display.innerText = memory.join('');
})

//returns the operation result
const equals = document.getElementById('equals');
equals.addEventListener('click', () => {
    let equation = display.innerText.replaceAll('x','*').replaceAll(',','.').replaceAll('÷','/');
    let result = evaluate(equation);
    if (result === Infinity || result === -Infinity || result === NaN) {
        result = 'Err';
    } else {result = String(result).replaceAll('.', ',');}
    display.innerText = result;
})
