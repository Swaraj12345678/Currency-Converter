const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownSel = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for(let codes in countryList){
//     console.log(codes, countryList[codes]);
// }

for(let select of dropdownSel){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode ;
        newOption.value = currCode ;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = "selected";
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);  
    })
}

const updateFlag = (elem) => {
    // console.log(elem);
    let currCode = elem.value; // INR EUR
    // console.log(currCode);
    let countryCode = countryList[currCode]; // IN EU US
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    // console.log(amountVal);
    if(amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = '1';
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(response);
    // console.log(data);
    console.log(rate);

    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); // form submit nhi and reload nhi hoga
    updateExchangeRate();
});

// jab bhi reoload hogo to by default usd to inr dikhyga

window.addEventListener("load", (evt) => {
    updateExchangeRate();
})