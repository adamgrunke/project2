require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
//Module allows use of sessions
const session = require('express-session');
// Imports passport local strategy
const passport = require('./config/passportConfig');
// module for flash messages
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const methodOverride = require('method-override');
const app = express();


//geocoding setup
const mapbox = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mapbox({
    accessToken: process.env.MAPBOX_PUBLIC_KEY
})

// This is only used by the sessionStore
const db = require('./models');

//This line makes the session use sequelize to write session data to a postgres table.
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize, 
  expiration: 1000 * 60 * 30
});

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());
app.use(methodOverride('_method'))

//Configures express-session middleware. Must happen before passport.
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// Use this line once to set up the store table
sessionStore.sync();

//Starts the flash middleware
app.use(flash());

//Link passport to the express session. Requires session to occur BEFORE. 
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  db.hazard.findAll().then(function(hazards){
    res.render('profile',{hazards});
  })

});

app.post('/profile', function(req, res) {
  db.item.create({
    hazardId: req.body.hazard,
    lat: req.body.lat,
    lng: req.body.lng,
    userId: req.body.id,
    cleanerId: null
  })
  res.redirect('profile')
});

app.get('/profile/show-all-items', function(req, res) {
  db.item.findAll().then(function(item){
    
    
    res.render('show-all-items', {item})
    // res.send({item})
  })
});

app.get('/profile/show-user-items', function(req, res) {
  db.item.findAll().then(function(items){
    
    
    res.render('show-user-items', {items})
    // res.send({item})
  })
});

// isLoggedIn requires login to access anything on this route
app.use('/auth', require('./controllers/auth')); 
app.use('/edit', require('./controllers/edit')); 

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
