x

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //Server rendered views
app.set('layout', 'layouts/layout') //Common layouts components like headers and footers
app.use(expressLayouts)
app.use(express.static('public')) //Public views

//router settings
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

//mongoose settings
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.listen(process.env.PORT || 3000)