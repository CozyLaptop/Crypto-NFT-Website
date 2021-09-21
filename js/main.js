// Using Coingecko API for pricing
// Free plan no keys needed
var url = "https://api.coingecko.com/api/v3/";

 //Ping
 function pingCoinGeckoAPI(){
    fetch(url + "/ping").then(response => {
        response.json().then(object => {
            console.log(object);
        })
    });
 }

// Display all coins unsorted
function displayAllCoinsUnsorted(){
    fetch(url + "/coins/list").then(response => {
        response.json().then(object => {
            console.log(object);
        })
    });
}

// Displays all coins, sorted. Check API for parameters
function displayTop100Coins(){
     var currency = "vs_currency=usd";
    fetch(url + "/coins/markets?" + currency).then(response => {
        response.json().then(object => {
            // Array of 100 coins
            console.log(object);
            object.forEach(coin => {
                var html = "";
                html += `<div>${coin.name}</div>`;
                $(".coin-list").append(html)
            })
        })
    });
}
displayTop100Coins();
