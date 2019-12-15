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

export let updateUser = ( req: Request, res: Response) => {
    Users.findByIdAndUpdate(req.params.id, req.body, (err: any, users: any) => {
        if(err){
            res.send(err);
        }
        else{
            res.send("Successfully updated user");
        }
    })
}