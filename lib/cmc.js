var request = require("request-promise");

//Formats SOV to have 4 decimal places.
async function sovFormat(sov) {
    sov = sov.toString();
    if (sov.indexOf(".") > -1) {
        sov = sov.split(".");
        sov[1] = sov[1].substr(0, 4);
        sov = sov.join(".");
    }
    return sov;
}

//Gets the price in SOV.
async function getSOVPrice() {
    //Connect to CMC, parse the data, get the USD price entry.
    try {
        return (await request({
            uri:  "https://api.coingecko.com/api/v3/simple/price?ids=sovereign-coin&vs_currencies=USD",
            json: true
        })).sovereign-coin.usd;
    } catch(e) {
        //If we couldn't connect to CMC, just use 2. 2 is simple.
        //This is for testing. This should crash the program in the future.
        return 2;
    }
}

//Helper functions that convert between USD and SOV.
async function sovToUSD(amount) {
    return (amount * (await getSOVPrice()));
}
async function usdToSOV(amount) {
    return (amount / (await getSOVPrice()));
}

module.exports = {
    sovFormat: sovFormat,
    getSOVPrice: getSOVPrice,
    sovToUSD: sovToUSD,
    usdToSOV: usdToSOV
};
