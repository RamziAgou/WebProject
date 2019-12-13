import express = require('express')
import path = require('path')
import bodyparser from 'body-parser'


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

app.get('/login', (req: any, res: any) => {
  res.render("login.ejs");
  // res.send('login')
})

app.get('/register', (req: any, res: any) => {
  res.render("register.ejs");
  //res.send('register')
})

app.post('/register', (req: any, res: any) => {

  console.log(req.body)
  res.send("hello");
  //res.send('register')
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})