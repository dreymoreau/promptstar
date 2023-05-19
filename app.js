const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// LOAD CONFIG where to find env file
dotenv.config({path: './config/config.env'})


// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// using morgan for logging only in dev environment
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// middleware for Handlebars
// extra engine word needed after exphbs to remove error
app.engine('.hbs', exphbs.engine({
    // wraps around the pages by default, extra pages can be added in after
    defaultLayout: 'main', 
    extname: '.hbs'
    })
)
// creating views engine to use handlebars
app.set('view engine', '.hbs')

// Session middleware (app might crash if middleware isn't in right place)
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
      })    
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 8500



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))