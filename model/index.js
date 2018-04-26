const debug = require("debug")("mongo:model");
const mongo = require("mongoose");
let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb+srv://Dafna:<Dafna972_>@yochidafna-zemea.mongodb.net/test');
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();
debug('Pending DB connection');
require("./user")(db);
//require("./todo")(db);
// require("./flower")(db);
// require("./customer")(db);
module.exports = model => db.model(model);
