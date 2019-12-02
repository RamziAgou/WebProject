import {Request, Response} from 'express'
import User from './../user'

export let allUsers = ( req: Request, res: Response) => {
    let users = User.find((err: any, users: any) => {
        if(err){
            res.send(err);
        }
        else{
            console.log(users);
            res.send(users);
        }
    })
}

export let getUser = ( req: Request, res: Response) => {
    User.findById(req.params.id, (err: any, users: any) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(users);
        }
    })
}

export let addUser = (req: Request, res: Response) => {
    let user = new User(req.body);

    user.save((err: any) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    })
}

export let deleteUser = (req: Request, res: Response) => {
    User.deleteOne({ _id: req.params.id }, (err : any) => {
        if(err){
            res.send(err);
        }
        else{
            res.send("Successfully deleted");
        }
    })
}

export let updateUser = ( req: Request, res: Response) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err: any, users: any) => {
        if(err){
            res.send(err);
        }
        else{
            res.send("Successfully updated user");
        }
    })
}