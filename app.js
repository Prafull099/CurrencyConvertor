// fetch api
// providde  an interface fro fetching sednign adn erceiving resources
// it usef request and response objects
// the fetch () method is use to fetch a resource data
// const url="https://cat-fact.herokuapp.com/facts";
// const facts=document.querySelector("#fact");
// const btns=document.querySelector("#btn");
// const getfacts= async()=>{
// console.log("getting data....");
// let response= await fetch (url);
// console.log(response);
// let data=await response.json();
// console.log(data[0]);
// facts.innerText=data[0].text;


// }
// btns.addEventListener("click",getfacts);
// import axios from 'axios';

// const apiKey = 'fca_live_jGpHkECNuJ1Q2YVFYy6pCnQp7GuvrWjeFsOCJziS';
// const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=USD&currencies=EUR`;

// axios
//   .get(URL)
//   .then(response => {
//     console.log("Exchange Rate Data:", response.data);
//   })
//   .catch(error => {
//     console.error("Error fetching data:", error);
//   });

// const apiKey = '370ad1fd00a71bcf1dfc2ca463404691';  // Your API key from ExchangeRatesAPI.io

// Fetch exchange rates when the form is submitted
// document.getElementById('currency-form').addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent the form from reloading the page

//   const amount = document.getElementById('amount').value; // Get the entered amount
//   const fromCurrency = document.getElementById('from-currency').value; // Get the 'from' currency
//   const toCurrency = document.getElementById('to-currency').value; // Get the 'to' currency

//   // Build the URL to get exchange rate data
//   const URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${fromCurrency}&symbols=${toCurrency}`;

//   // Fetch the exchange rate data
//   fetch(URL)
//     .then(response => response.json()) // Parse the JSON response
//     .then(data => {
//       const exchangeRate = data.rates[toCurrency]; // Get the exchange rate for the 'to' currency
//       const convertedAmount = (amount * exchangeRate).toFixed(2); // Convert the amount

//       // Update the message with the conversion result
//       document.querySelector('.msg').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       document.querySelector('.msg').textContent = 'Error fetching exchange rate. Please try again.';
//     });
// });

const url="https://api.exchangerate-api.com/v4/latest";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcur=document.querySelector(".from select");
const tocur=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdowns)
{
for(curcode in countryList)
{
  // console.log(code,countryList[code]);
  let newoption=document.createElement("option");
  newoption.innerText=curcode;
  newoption.value=curcode;
  if(select.name === " from" && curcode==="USD")
  {
    newoption.selected="selected";
  }
  else if(select.name === "to" && curcode==="INR")
  {
    newoption.selected="selected";
  }
  select.append(newoption);
}
select.addEventListener("change",(evt)=>{
  updateFlag(evt.target);
});
}
const updateFlag=(element)=>{
let curCode=element.value;
let countryCode=countryList[curCode];
let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;

};
btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
     //console.log(amount.value);
      let amVal= amount.value ;
      if(amVal ==="" || amVal<1)
      {
        amVal=1;
        amount.value="1";
      }
      //console.log(fromcur.value,tocur.value);
      const URL=`${url}/${fromcur.value.toLowerCase()}?symbols=${tocur.value.toLowerCase()}`;
      let response= await fetch(URL);
      let data=await response.json();
      //console.log(data);
      const rate=data.rates[tocur.value.toUpperCase()];
      let finalamount =amVal*rate;
      // console.log(exchangerate);
      msg.innerText=`${amVal}${fromcur.value}=${finalamount}${tocur.value}`;

});


