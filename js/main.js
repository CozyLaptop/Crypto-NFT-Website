// Using Coingecko API for pricing
// Free plan no keys needed
var url = "https://api.coingecko.com/api/v3/";

 //Ping
 function pingCoinGeckoAPI(){
    fetch(url + "/ping").then(response => {
        response.json().then(object => {
            console.log(object);
        });
    });
 }

// Display all coins unsorted
function displayAllCoinsUnsorted(){
    fetch(url + "/coins/list").then(response => {
        response.json().then(object => {
            console.log(object);
        });
    });
}

// Displays all coins, sorted. Check API for parameters
function displayTop100Coins(){
     var currency = "vs_currency=usd";
    fetch(url + "/coins/markets?" + currency).then(response => {
        response.json().then(object => {
            // Array of 100 coins
            console.log(object);
            //
            var html = "";
            object.forEach(coin => {
                html = "";
                html +=
                    `<div class="col-12 mb-1 coin-container">
                                <img class="coin-logo" src="${coin.image}" alt="${coin.name} logo">
                                <span class="coin-logo-container center">
                                <div class="m-1"></div>
                                ${coin.name}
                                <div class="m-1"></div>
                                <span style="color: darkgray" class="font-weight-light">${coin.symbol.toUpperCase()}</span>
                            </span>
                             
                            $${coin.current_price}
                            ${percentageFormatter(coin.price_change_percentage_24h)}
                    </div>`;
                $(".coin-list").append(html);
            });
        });
    });
}
function percentageFormatter(rawPercentage){
    rawPercentage = rawPercentage.toFixed(2).toString();
    var html = "";
    if (rawPercentage.charAt(0) === "-"){
        html += `<span class="red-percentage">
                <img class="triangle" src="img/red-triangle.png" alt="negative red triangle">
                ${rawPercentage}%`;
    } else {
        html += `<span class="green-percentage">
        <img class="triangle" src="img/green-triangle.png" alt="positive green triangle">
        ${rawPercentage}%`;
    }
    html += `</span>`;
    return html;
}
displayTop100Coins();
