//Needed libraries...
var express, cmc;

module.exports = async (config) => {
    express = config.express;
    cmc = config.cmc;

    var router = express.Router();

    router.get("/sov", async (req, res) => {
        res.end((await cmc.getSOVPrice()).toString());
    });

    return router;
};
