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

    getHTH: async () => {
        GET("/price/hth", async (res) => {
            if (Number.isNaN(parseFloat(res))) {
                return;
            }

            //Set a global variable.
            window.price.hth = await window.price.format(res);
            //Update the HTML field if it exists.
            var hthHTML = document.getElementById("hthValueNum");
            if (hthHTML !== null) {
                hthHTML.innerHTML = window.price.hth;
            }
        });
    },

    hthToUSD: async (amount) => {
        return (await window.price.format(amount * parseFloat(window.price.hth)));
    },

    usdToHTH: async (amount) => {
        return (await window.price.format(amount / parseFloat(window.price.hth)));
    }
};

window.price.getHTH();
