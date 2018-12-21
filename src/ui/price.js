//Needed libraries...
var express, cmc;

module.exports = async (config) => {
    express = config.express;
    cmc = config.cmc;

    var router = express.Router();

    router.get("/hth", async (req, res) => {
        res.end((await cmc.getHTHPrice()).toString());
    });

    return router;
};
