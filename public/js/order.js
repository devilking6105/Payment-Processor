var address, order, status;

async function cancel() {
    if (status !== "Pending") {
        alert("This order can't be cancelled.");
        return;
    }

    window.orders.cancel(address);
}

async function paidInCash() {
    if (status !== "Pending") {
        alert("This order can't be marked as paid in cash.");
        return;
    }

    window.orders.cash(address);
}

async function done() {
    window.location.href = "/";
}

async function init() {
    address = window.location.search.substr(1).split("address=")[1].split("&")[0];
    document.getElementById("address").innerHTML = address;

    order =
        window.orders.active[address] ||
        window.orders.succeeded[address] ||
        window.orders.failed[address];

    status =
        (window.orders.active[address] ? "Pending" : null) ||
        (window.orders.succeeded[address] ? "Succeeded" : null) ||
        (window.orders.failed[address] ? "Failed" : null);

    document.getElementById("status").innerHTML = status;
    switch (status) {
        case "Pending":
            document.getElementById("statusDiv").style.background = "#498437";
            break;

        case "Succeeded":
            document.getElementById("statusDiv").style.background = "green";
            break;

        case "Failed":
            document.getElementById("statusDiv").style.background = "red";
            break;
    }

    var qr = document.getElementById("qr");
    qr.src = "/qr/" + address;
    qr.setAttribute("height", "100%");
    qr.setAttribute("width", "100%");

    document.getElementById("date").innerHTML = (new Date(order.time)).toString().split("GMT")[0];
    document.getElementById("usd").innerHTML = await window.price.format(order.usd);
    document.getElementById("hthPayment").innerHTML = await window.price.format(order.amount);
    document.getElementById("hthNow").innerHTML = await window.price.usdToHTH(order.usd);
    document.getElementById("note").innerHTML = order.note;
}

//Wait until we have the price and orders...
async function timeout() {
    if (
        (typeof(window.price.hth) === "undefined") ||
        (typeof(window.orders.active) === "undefined") ||
        (typeof(window.orders.succeeded) === "undefined") ||
        (typeof(window.orders.failed) === "undefined")
    ) {
        setTimeout(timeout, 50);
        return;
    }

    init();
}
timeout();
