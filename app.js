const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const stylus = require('stylus')
const expressSession = require('express-session')
const csurf = require('csurf')

const sessionStore = require('./session-store')
const localPassport = require('./local-passport')
const flash = require('./flash')
const index = require('./routes/index')
const users = require('./routes/users')
const session = require('./routes/session')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  expressSession({
    // TODO: read from env
    secret: 'secret session key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: sessionStore
  })
)
app.use(csurf({ cookie: true }))
app.use(flash())
app.use(localPassport.initialize())
app.use(localPassport.session())

app.use('/', index)
app.use('/users', users)
app.use('/session', session)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
