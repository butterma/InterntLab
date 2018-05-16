const debug = require("debug")("ex5:branch-model");
const mongo = require("mongoose");

module.exports = db =>
{
    let schema = new mongo.Schema({
        name: { type: String, required: true, unique: true, index: true },
        address: { type: String, required: true },
        workers_amount: Number,
        established_at: Date
    }, 
    
    { autoIndex: false });
    
    schema.statics.CREATE = async function(branch) {
        return this.create({
            name: branch[0],
            address: branch[1],
            workers_amount: branch[2],
            established_at: branch[3]
        });
    };
    
    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments);
        if (arguments.length === 0) {
            debug("request: no arguments - bring all at once")
            return this.find({}).exec();
        }
        // perhaps last argument is a callback for every document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            args.pop();
            let cursor, branch;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (branch = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(branch);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(branch);
                    }
            }
        } 
            catch (err) { throw err; }
            return;
        }
        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }
        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    schema.statics.UPDATE = async function(branch) {
        return this.updateOne({
            name: branch[0],
            address: branch[1],
            cateworkers_amountgory: branch[2],
            established_at: branch[3]
        });
    };

    
    schema.statics.DELETE = async function(branch) {
        return this.deleteOne({
            name: branch[0]
        });
    };

    db.model('Branch', schema); // if model name === collection name
        debug("branch model created");    
}
    
    