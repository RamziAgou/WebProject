const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
import * as UserController from './Controllers/userController'
const router = express.Router();
const routerAuth = express.Router();
const app = express();

var sess; //I know this is not really recommanded to set a global session like this...

const authCheck = function (req: any, res: any, next: any) {
    sess = req.session;
    if (sess.email) {
        console.log("je rentre la");
        next()
    }
    else {
        res.render("login.ejs");
    }
}

app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
routerAuth.use(authCheck);

router.get('/', (req, res) => {
    sess = req.session;
    if (sess.email) {
        return res.redirect('Users/' + sess.email);
    }
    res.render("login.ejs");
});

router.post('/login', (req, res) => {

    UserController.getUserByMail(req.body.email, (users) => {
        if (users == '') {
            console.log("Cette adresse mail n'existe pas");
        }
        else {
            console.log("users.password :" + users[0].password + " req.body.password:" + req.body.password);
            if (users[0].password === req.body.password) {
                sess = req.session;
                sess.email = req.body.email;
                res.redirect('Users/' + sess.email);
            }
            else {
                console.log("Mot de passe incorrect");
            }
        }
    });
});

router.get('/register', (req, res) => {
    sess = req.session;
    console.log(sess);
    if (sess.email) {
        return res.redirect('Users/' + sess.email);
    }
    res.render("register.ejs");
})

router.post('/register', (req, res) => {


    UserController.getUserByMail(req.body.email, (users) => {
        if (users == '') {
            console.log(req.body);
            UserController.addUser(req, (user) => {
                console.log("je rentre la");
                sess = req.session;
                sess.email = user.email;
                res.redirect('Users/' + sess.email);
            });
        }
        else {
            console.log("Cette adresse mail est déjà utilisée");
        }
    });
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

router.post('/:email', (req, res) => {
    
    sess = req.session;
    
    UserController.update(req, (affected) => {
        if(affected.n == 0){
            console.log("There is no user who match this email sorry");
        }
        else{
            if(affected.nModified == 0){
                console.log("Sorry there is an issue with the modification");
            }
            else{
                console.log("Modification Done");
                if(sess.email === req.params.email){
                    sess.email = req.body.email;
                    res.redirect('Users/' + sess.email);
                }
                else{
                    res.redirect('/');
                }
            }
        }
    })
})

router.delete('/:email', (req, res) => {

    sess = req.session;

    UserController.getUserByMail(req.params.email, (users) => {
        if (users == '') {
            res.send("This email is not assigned to any users, sorry");
        }
        else {
            UserController.deleteUser(req, () => {
                if (sess.email == req.params.email) {
                    req.session.destroy((err) => {
                        if (err) {
                            return console.log(err);
                        }
                        res.send("You deleted yourself, you'll now get logout")
                    });
                }
                else {
                    res.send(req.params.email + " get deleted successfully");
                }
            })
        }
    });

})

//Here we are getting /Users, because of the app.use at the end of the code
routerAuth.get('/', UserController.allUsers);

//Here we are getting /Users/:email because of the app.use at the end of the code
routerAuth.get('/:email', (req, res) => {

    UserController.getUserByMail(req.params.email, (users) => {
        if (users == '') {
            console.log("Pas trouvé");
        }
        else {
            console.log("Users : " + users);
            res.send(users);
        }
    });

});

app.use('/Users', routerAuth);
app.use('/', router);


app.listen(process.env.PORT || 8080, () => {
    console.log(`App Started on PORT ${process.env.PORT || 8080}`);
});