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

router.get('/updateProfile', (req, res) => {

    sess = req.session


    res.render("updateProfile.ejs", {
        email: sess.email
    });
});


router.post('/login', (req, res) => {

    const { email, password } = req.body;
    let errors = [] as any;

    if (!email || !password) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (errors.length > 0) {
        
        res.render('login', {
            errors,
            email,
            password,
        });
    }
    else {
        
        UserController.getUserByMail(req.body.email, (users) => {
            if (users == '') {
                errors.push({ msg: 'Email does not exist' });
                res.render('login', {
                    errors,
                    email,
                    password,
                });
            }
            else {
                if (users[0].password === req.body.password) {
                    sess = req.session;
                    sess.email = req.body.email;

                    var metric = { 
                        id : "connection",
                        value : 1,
                        type : "con",
                        timestamp : new Date().toUTCString()
                    }
                    UserController.newMetrics(sess.email, metric, (success) => {
                        //console.log(success);
                    })
                    res.redirect('Users/' + sess.email);
                }
                else {
                    console.log("Mot de passe incorrect");
                    errors.push({ msg: 'Wrong password' });
                    res.render('login', {
                        errors,
                        email,
                        password,
                    });
                }
            }
        });
    }
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

    const { username, email, password, password2 } = req.body;
    let errors = [] as any;

    if (!username || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password,
            password2
        });
    }

    else {

        UserController.getUserByMail(req.body.email, (users) => {
            if (users == '') {
                req.body.metrics = []
                UserController.addUser(req, (user) => {
                    sess = req.session;
                    sess.email = user.email;
                    res.redirect('Users/' + sess.email);
                });
            }
            else {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    username,
                    email,
                    password,
                    password2
                });
            }
        });

    }
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

    //error handler
    const { username, email, password, password2 } = req.body;
    let errors = [] as any;

    if (!username || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('updateProfile', {
            errors,
            username,
            email,
            password,
            password2
        });
    }
    
    else {

        UserController.update(req, (affected) => {
            if (affected.n == 0) {
                errors.push({ msg: 'There is no user who match this email sorry' });
                res.render('updateProfile', {
                    errors,
                    username,
                    email,
                    password,
                    password2
                });
            }
            else {
                if (affected.nModified == 0) {
                    errors.push({ msg: 'Sorry there is an issue with the modification' });
                    res.render('updateProfile', {
                        errors,
                        username,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    console.log("Modification Done");
                    if (sess.email === req.params.email) {
                        sess.email = req.body.email;
                        res.redirect('Users/' + sess.email);
                    }
                    else {
                        res.redirect('/');
                    }
                }
            }
        })

    }
})

// prbm redirect après delete
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
                        // res.send("You deleted yourself, you'll now get logout")
                        res.redirect('/logout');
                    });
                }
                else {
                    // res.send(req.params.email + " get deleted successfully");
                    res.redirect('/');
                }
            })
        }
    });

})

//Here we are getting /Users, because of the app.use at the end of the code
routerAuth.get('/', UserController.allUsers);

routerAuth.delete('/metrics/:id', (req, res) => {

    sess=req.session;
    console.log(req.params.id)

    UserController.deleteMetric(sess.email, req.params.id, () => {
        
    });
})

routerAuth.post('/metrics', (req, res) => {

    sess = req.session;
    req.body.type = "user"
    req.body.timestamp = new Date().toUTCString()
    var test = []

    UserController.findMetric(sess.email, req.body.id, () => {

        UserController.newMetrics(sess.email, req.body, (success) => {

        })
    })
    
})

//Here we are getting /Users/:email because of the app.use at the end of the code
routerAuth.get('/:email', (req, res) => {

    UserController.getUserByMail(req.params.email, (users) => {



        if (users == '') {
            console.log("Pas trouvé");
        }
        else {


            //res.send(users);

            res.render("dashboard.ejs", {
                user: users[0]
            })
        }
    });

});

app.use('/Users', routerAuth);
app.use('/', router);


app.listen(process.env.PORT || 8080, () => {
    console.log(`App Started on PORT ${process.env.PORT || 8080}`);
});