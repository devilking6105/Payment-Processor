window.price = {
    format: async (amount) => {
        amount = amount.toString();
        if (amount.indexOf(".") > -1) {
            amount = amount.split(".");
            amount[1] = amount[1].substr(0, 6);
            amount = amount.join(".");
        }
        return amount;
    },

    getSOV: async () => {
        GET("/price/sov", async (res) => {
            if (Number.isNaN(parseFloat(res))) {
                return;
            }

            //Set a global variable.
            window.price.sov = await window.price.format(res);
            //Update the HTML field if it exists.
            var sovHTML = document.getElementById("sovValueNum");
            if (sovHTML !== null) {
                sovHTML.innerHTML = window.price.sov;
            }
        });
    },

    sovToUSD: async (amount) => {
        return (await window.price.format(amount * parseFloat(window.price.sov)));
    },

    usdToSOV: async (amount) => {
        return (await window.price.format(amount / parseFloat(window.price.sov)));
    }
};

window.price.getSOV();
