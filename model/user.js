const debug = require("debug")("ex5:user-model");
const mongo = require("mongoose");

module.exports = db =>
{
    let schema = new mongo.Schema({
        //name: String,
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        category: Number,
        activate: Boolean,
       // meta: { age: Number, website: String },
        created_at: Date,
        updated_at: Date
    }, 
    
    { autoIndex: false });
    
    schema.statics.CREATE = async function(user) {
        return this.create({
            username: user[0],
            password: user[1],
            category: user[2],
            activate: user[3]
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
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
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

    schema.statics.UPDATE = async function(user) {
        return this.updateOne({username:user[0]},{category: user[2]});
    };

    
    schema.statics.DELETE = async function(user) {
        return this.deleteOne({
            username: user[0],
            password: user[1]
        });
    };

    db.model('User', schema); // if model name === collection name
        debug("User model created");
    // on every save, add the date
    schema.pre('save', function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });
}
    
    