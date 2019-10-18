const express = require('express');
const connectDB = require('./config/db');
var users = require('./routes/api/users')
var bodyParser = require('body-parser')

const app = express();

// Connect Database
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/users', users)

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));