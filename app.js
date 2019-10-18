const express = require('express');
const connectDB = require('./config/db');
var users = require('./routes/api/users')
var bodyParser = require('body-parser')
var session = require('express-session');

const app = express();

// Connect Database
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 80000 }}))
 
// Access the session as req.session
app.get('/add_cookie', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session. refresh!')
  }
});

app.get('/destroy_cookie', function(req, res, next) {
    if(req.session.views) {
        res.setHeader('Content-Type', 'text/html')
        req.session.destroy();
        res.end('session is destroyed');
        
    } else {
        req.session.views = 1
        res.end('welcome to the session. refresh!')
    }

});

app.use('/users', users)

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));