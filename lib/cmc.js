var request = require("request-promise");

//Formats HTH to have 4 decimal places.
async function hthFormat(hth) {
    hth = hth.toString();
    if (hth.indexOf(".") > -1) {
        hth = hth.split(".");
        hth[1] = hth[1].substr(0, 4);
        hth = hth.join(".");
    }
    return hth;
}

//Gets the price in HTH.
async function getHTHPrice() {
    //Connect to CMC, parse the data, get the USD price entry.
    try {
        return (await request({
             uri: "https://api.coingecko.com/api/v3/simple/price?ids=help-the-homeless-coin&vs_currencies=usd",
             json: true
         }))['help-the-homeless-coin'].usd;
    } catch(e) {
        //If we couldn't connect to CMC, just use 1. 1 is simple.
        //This is for testing. This should crash the program in the future.
        return 1;
    }
}

//Helper functions that convert between USD and HTH.
async function hthToUSD(amount) {
    return (amount * (await getHTHPrice()));
}
async function usdToHTH(amount) {
    return (amount / (await getHTHPrice()));
}

module.exports = {
    hthFormat: hthFormat,
    getHTHPrice: getHTHPrice,
    hthToUSD: hthToUSD,
    usdToHTH: usdToHTH
};
