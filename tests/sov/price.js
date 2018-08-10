var request = require("request-promise");
(async () => {
    var price = await request({
        url: "http://localhost:8080/sov/price",
        headers: {Cookie: "token=admin"}
    });
    /*eslint-disable-next-line no-console*/
    console.log("The SOV price, according to the server, is " + price + ".");
})();
