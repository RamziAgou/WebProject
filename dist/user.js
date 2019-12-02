"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var url = 'mongodb://127.0.0.1:27017/WebProject';
mongoose.connect(url, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Successfuly connected to MongoDB");
    }
});
exports.UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
var User = mongoose.model('User', exports.UserSchema);
exports.default = User;
