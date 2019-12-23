import {Request, Response} from 'express'
import Users from './../user'


export let allUsers = ( req: Request, res: Response) => {
    let users = Users.find((err: any, users: any) => {
        if(err){
            res.send(err);
        }
        else{
            console.log(users);
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

export let addUser = (req: Request, callback : (user : any) => void) => {
    console.log("je rentre ici");
    let user = new Users(req.body);

    console.log(user);
    user.save((err: any) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfuly added");
            callback(user);
        }
    })
}

export let deleteUser = (req: Request, callback : () => void ) => {
    Users.deleteOne({ email: req.params.email }, (err : any) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("User supprimé");
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

export let newMetrics = ( user_email : string, req : Request, callback : (success) => void ) => {
    
    Users.findOneAndUpdate(
        { email : user_email},
        { $push : { metrics : req.body } },
        (error, success) => {
            if(error){
                console.log(error)
            }
            else{
                callback(success)  
            }
        }
    )
}

export let updateUser = ( req: Request, callback : () => void) => {
    Users.findByIdAndUpdate(req.params.email, req.body, (err: any, users: any) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(users);
            console.log("Successfully updated user");
        }
    })
}