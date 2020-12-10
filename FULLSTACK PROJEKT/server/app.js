const express = require('express')
const dBModule = require('./dBModule')
const personModel = require('./PersonModel')
const messageModel = require('./MessageModel')
const app = express()
const port = 3000

const clientDir = __dirname + "\\client\\"

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(clientDir))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index.ejs', {name: ' Max'})
})

app.get('/home', (req, res) => {
  res.render('pages/home.ejs')
})


app.get('/messages', async (req, res) => {
  let messages = await messageModel.getAllMessages()
  res.render("pages/messages.ejs", { names: messages.reverse() })
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
