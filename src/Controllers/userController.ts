import {Request, Response} from 'express'
import Users from './../user'
import { doesNotReject } from 'assert';


export let allUsers = ( req: Request, res: Response) => {
    let users = Users.find((err: any, users: any) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(users);
        }
    })
}

export let getUserByMail = ( email : string , callback : (users : any) => void ) => {
    Users.find({"email" : email}, (err: any, users: any) => {
        if(err){
            return err;
        }
        else{
            callback(users);
        }
    })
}

export let findMetric = ( user_email : string, idMetric : string, callback : () => void) => {

    var user = Users.find({ email : user_email }).where('metrics', { $elemMatch: { id : idMetric, type : 'user'} }).exec( (err, doc) => {
        if(!(Array.isArray(doc) && doc.length)){
            callback()
        }
        else{
            console.log("This metric's id is already used")
        }
    })
}

export let updateMetrics = ( user_email : string, body : any, callback : () => void ) => {

    Users.findOneAndUpdate(
        { email : user_email, 'metrics.id' : body.id},
        { $set : { 'metrics.$.value' : body.value}},
        (error, success) => {
            if(error){
                console.log(error)
            }
            else{
                callback()
            }
        }
    )
}

export let newMetrics = ( user_email : string, body : any, res : Response, callback : () => void ) => {
    
    console.log(body)
    Users.findOneAndUpdate(
        { email : user_email},
        { $push : { metrics : body } },
        (error, success) => {
            if(error){
                console.log(error)
            }
            else{
                callback()
            }
        }
    )
}

export let deleteMetric = ( user_email : string, idMetric : string, res: Response, callback : () => void) => {
    Users.findOneAndUpdate( 
        { email : user_email}, 
        { $pull : { metrics : { id : idMetric, type : 'user' } } },
        { new : true},
        ).exec( (err, doc) => {
            res.end()
        })
}

export let addUser = (body: any, callback : (user : any) => void) => {
    let user = new Users(body);

    user.save((err: any) => {
        if(err){
            console.log(err);
        }
        else{
            callback(user);
        }
    })
}

export let deleteUser = (emailToDelete : string, callback : () => void ) => {
    Users.deleteOne({ email: emailToDelete }, (err : any) => {
        if(err){
            console.log(err);
        }
        else{
            callback();
        }
    })
}

export let update = ( req: Request, callback : (affected) => void) => {
    Users.updateOne( { email : req.params.email }, {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }, (err, affected, resp) => {
        if(err){
            console.log(err)
        }
        else{
            callback(affected)
        }
    })
}

export let updateUser = ( req: Request, callback : () => void) => {
    Users.findByIdAndUpdate(req.params.email, req.body, (err: any, users: any) => {
        if(err){
            console.log(err);
        }
        else{

        }
    })
}