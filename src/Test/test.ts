import { expect } from 'chai'
import * as UserController from '../Controllers/userController'
import Users from '../user'

const mongoose = require('mongoose');

const url : string = 'mongodb://localhost:27017/WebProjectTest';

//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser : true, useUnifiedTopology : true}); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

beforeEach((done) => {
    mongoose.connection.collections.Users.drop(() => {
        done();
    }); 
});

describe('CRUD Users', () => {
    it('Creates a user', (done) =>{
        let user = { username : "Groui", email : "groui@gmail.com", password: '123456', metrics : []}
        let userDoc = new Users(user)
        UserController.addUser(userDoc, (newUser) => {
            UserController.getUserByMail(newUser.email, (userdb) => {
                expect({ email : userdb[0].email, username : userdb[0].username, password : userdb[0].password})
                .to.eql( { email : user.email, username : user.username, password : user.password})
                done()
            })
        })
    })
})

