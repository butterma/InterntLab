const debug = require('debug')('mongo:mongo')
const mongo = require("mongoose");
let db = mongo.createConnection('mongodb://user:user@yochidafna-shard-00-00-zemea.mongodb.net:27017,yochidafna-shard-00-01-zemea.mongodb.net:27017,yochidafna-shard-00-02-zemea.mongodb.net:27017/test?ssl=true&replicaSet=YochiDafna-shard-0&authSource=admin');
db.on('open', function() { debug("On open DB") });
db.on('error', function(err) {  debug("Error connecting to DB" + err) });
db.on('connecting', () => { debug('On connecting to MongoDB: '); });
db.on('connected', () => { debug('On connected to MongoDB: '); })
db.on('disconnecting', () => { debug('On disconnecting to MongoDB: '); });
db.on('disconnected', () => { debug('On disconnected to MongoDB: '); });
db.on('disconnecting', () => { debug('On disconnecting to MongoDB: '); });
db.on('reconnected', () => { debug('On reconnected to MongoDB: '); });
db.on('error', err => { debug('On error to MongoDB: ' + err); });
db.on('close', () => { debug('On MongoDB close: '); });
console.log('Pending DB connection');
db.then(async db1 => {
    debug('Creating model');
    let Test = db.model("Test", new mongo.Schema({}),"Empties");
    debug('Creating a document');
    await Test.create({});
    debug('Query');
    let tests = await Test.find({}).exec();
    debug(tests);
    debug(await Test.findOne({}).exec());
    let close = db1.close();
    debug('Closing');
    await close;
    debug('Closed');
}).catch(err => debug("Error" + err));
