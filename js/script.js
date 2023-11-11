const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomFunction = {
    lowercase: getRandomLowercase,
    uppercase: getRandomUppercase,
    numbers: getRandomNumber,
    symbols: getRandomSymbol
}


clipboardElement.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultElement.innerText;

    if(!password){
        alert("No password");
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard!");
});


generateElement.addEventListener("click", () => {
    const length = lengthElement.value;
    const hasUppercase = uppercaseElement.checked;
    const hasLowercase = lowercaseElement.checked;
    const hasNumbers = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;

    resultElement.innerText = generatePassword(length, hasLowercase, hasUppercase, hasNumbers, hasSymbols);
});

function generatePassword(length, lowercase, uppercase, numbers, symbols){
    let generatePassword = '';
    const checkCount = lowercase + uppercase + numbers + symbols;
    // console.log(checkCount);
    const checkArray = [{lowercase}, {uppercase}, {numbers}, {symbols}].filter(item => Object.values(item)[0]);
    // console.log(checkArray);

    if(checkCount === 0){
        return "";
    }

    for(i = 0; i < length; i += checkCount){
        // console.log(i);
        checkArray.map(type =>{
            // console.log(item);
            const functionName = Object.keys(type)[0];
            // console.log(functionName);
            generatePassword += randomFunction[functionName]();
            // console.log(generatePassword);
        })
    }
    // console.log(checkArray);

    const finalPassword = generatePassword.slice(0, length);
    // console.log(finalPassword);
    return finalPassword;

}

function getRandomLowercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomNumber());