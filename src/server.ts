import express = require('express')
import path = require('path')
import * as bodyparser from 'body-parser'
import * as UserController from './Controllers/userController'


const app = express()
app.set('views', __dirname + "/View");
app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded()) 
app.use(express.static(path.join( __dirname, 'public')))


const port: string = process.env.PORT || '8080'

app.get('/', (req: any, res: any) => {
  res.render("home.ejs");
})

app.get('/Users', UserController.allUsers);
app.get('/Users/:id', UserController.getUser); 

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})