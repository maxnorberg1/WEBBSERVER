const express = require('express');
const dBModule = require('./dBModule');
const personModel = require('./PersonModel');
const messageModel = require('./MessageModel');
const Product = require('./models/product');
const User = require('./models/user');


const app = express()
const port = 3000

const clientDir = __dirname + "\\client\\"

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(clientDir))



app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('pages/index.ejs', {
    name: ' Max'
  })
})

app.get('/home', async (req, res) => {
  var docs = await Product.find({});
  res.render('shop/home.ejs', { products: docs });
})

app.get('/user/signup', (req, res) => {
  res.render('user/signup.ejs', {});
});


app.get('/messages', async (req, res) => {
  let messages = await messageModel.getAllMessages()
  res.render("pages/messages.ejs", {
    names: messages.reverse()
  })
})


app.post('/', async (req, res) => {

  let person = personModel.createPerson(req.body.name, req.body.password)

  await dBModule.storeElement(person)

  res.redirect('/home')
})

app.post('/messages', async (req, res) => {

  let message = messageModel.createMessage(req.body.email, req.body.message)

  await dBModule.storeElement(message)

  res.redirect('/messages')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})