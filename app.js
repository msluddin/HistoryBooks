const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const hbs = require('express-handlebars')
const path = require('path')
const mongan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

//Load config
dotenv.config({path:'./config/config.env'})

//Connect Database
const connectDB = require('./config/db');

connectDB();

//Passport config
require('./config/passport')(passport)

const PORT = process.env.PORT || 5000
const app = express();


//@Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

//logging 
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

//Handlebars helper
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

// Handlebars view engine setup
app.engine('hbs',  hbs.engine({extname: 'hbs', 
helpers:{
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
}, 
defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://msluddin:106320@cluster0.qbd0p.mongodb.net/?retryWrites=true&w=majority' })
  }))


//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Set global var
app.use(function(req, res, next){
  res.locals.user = req.user || null
  next()
} )

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

app.listen(PORT, console.log(`Server running on port http://localhost:${PORT}`))

