const express = require('express');
const connectDB = require('./config/db');
var books = require('./routes/api/books')

const app = express();

// Connect Database
connectDB();

app.use('/books', books)

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));