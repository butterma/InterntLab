let mongo = require("mongoose");
(async () => {
  try {
      let db = await mongo.createConnection('mongodb://user:user@yochidafna-shard-00-00-zemea.mongodb.net:27017,yochidafna-shard-00-01-zemea.mongodb.net:27017,yochidafna-shard-00-02-zemea.mongodb.net:27017/test?ssl=true&replicaSet=YochiDafna-shard-0&authSource=admin');
      await db.dropDatabase();
      logandexit('DB cleared');
  } catch (err) {
      logandexit("Failed: " + err);
  }
})();
function logandexit(str) {
    console.log(str);
    process.exit(0);
}
