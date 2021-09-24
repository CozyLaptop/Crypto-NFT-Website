// Using Coingecko API for pricing
// Free plan no keys needed
// Clone the repo and enjoy!
var url = "https://api.coingecko.com/api/v3/";
var coinArray = [];
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

// Refreshes coins from server, sorted by market cap
function refreshCoinsFromServer(){
     var currency = "vs_currency=usd";
    fetch(url + "/coins/markets?" + currency).then(response => {
        response.json().then(object => {
            object.forEach(coin => {
                //Adds each coin to a global coin array
                coinArray.push(coin);
            });
        }).then(()=>{
            //Sorted by market cap
            console.log("Coins refreshed: ")
            console.log(coinArray);
            displayTop100Coins(coinArray);
        });
    });
}
function displayTop100Coins(){
     $(".coin-list").html("");
    // The coin array will be sorted before passing in
    coinArray.forEach((coin)=>{
        var html = "";
        html +=
            //Build HTML for each coin in object array
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
    })
}

//Returns green and red percentage and arrows.
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
//Functions and events for sorting coins
$("#AtoZ").click(function (){
    coinArray.sort(function(a, b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
    });
    displayTop100Coins();
});
$("#ZtoA").click(function (){
    coinArray.sort(function(a, b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
    });
    coinArray.reverse();
    displayTop100Coins();
});
$("#HighestToLowest24h").click(function (){
    coinArray.sort(function(a, b) {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
    });
    displayTop100Coins()
});
$("#LowestToHighest24h").click(function (){
    coinArray.sort(function(a, b) {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
    });
    displayTop100Coins()
});

//Init
//Sorted by market cap
refreshCoinsFromServer();



