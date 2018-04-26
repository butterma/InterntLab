const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

let schema = new mongo.Schema({
    name: String,
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: { age: Number, website: String },
    created_at: Date,
    updated_at: Date
}, { autoIndex: false });
