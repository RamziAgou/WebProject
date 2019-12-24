import * as express from 'express'
import mongoose = require('mongoose');

//const url : string = 'mongodb://mongo:27017/WebProject';
const url : string = 'mongodb://127.0.0.1:27017/WebProject';

mongoose.connect(url, (err : any) => {
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Successfuly connected to MongoDB");
    }
})

//mongoose.set('debug', true)



export const UsersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    metrics: {type : Array, required: true}
});

const Users = mongoose.model("Users", UsersSchema, "Users");
export default Users;