"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("./../user"));
exports.allUsers = function (req, res) {
    var users = user_1.default.find({ "firstName": "Ramzi" }, function (err, users) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(users);
            res.send(users);
        }
    });
};
exports.getUser = function (req, res) {
    user_1.default.findById(req.params.id, function (err, users) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(users);
        }
    });
};
exports.addUser = function (req, res) {
    var user = new user_1.default(req.body);
    user.save(function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(user);
        }
    });
};
exports.deleteUser = function (req, res) {
    user_1.default.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully deleted");
        }
    });
};
exports.updateUser = function (req, res) {
    user_1.default.findByIdAndUpdate(req.params.id, req.body, function (err, users) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully updated user");
        }
    });
};
