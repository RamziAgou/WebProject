"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var body_parser_1 = __importDefault(require("body-parser"));
var UserController = __importStar(require("./Controllers/userController"));
var app = express();
app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || '8080';
app.get('/', function (req, res) {
    res.render("home.ejs");
});
app.get('/Users', UserController.allUsers);
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
