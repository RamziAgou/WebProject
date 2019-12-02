import * as express from 'express'
import mongoose = require('mongoose');

const url : string = 'mongodb://127.0.0.1:27017/WebProject';

mongoose.connect(url, (err : any) => {
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Successfuly connected to MongoDB");
    }
})



export const UsersSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const Users = mongoose.model("Users", UsersSchema, "Users");
export default Users;