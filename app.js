var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var methodOverride = require('method-override');
var app = express();
var port = 5000;


//Load Routes
var ideas = require('./routes/ideas');
var users = require('./routes/users');

// Connect to mongoose
mongoose.connect('mongodb://qaz:qazqaz@ds223268.mlab.com:23268/mydb')
    .then(function () {
        encodeURIComponent('prasad123');
        console.log("Mlab connected");
    })
    .catch(function (err) {
        console.log(err);
    });


// Handlebars Middleware
app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Method-overide middleware
app.use(methodOverride('_method'));

app.use(flash());

//Express session middleware
app.use(session({
    secret: 'secret ',
    resave: false,
    saveUninitialized: true,    
  }));

// parse application/json
app.use(bodyParser.json());


//Global variables

app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/ideas',ideas);
app.use('/users',users);

app.listen(port, function () {
    //console.log("server started on node"+ port);
});

app.get('/', function (req, res) {
    res.render("Index");
});


app.get('/About', function (req, res) {
    res.render("about");
});






