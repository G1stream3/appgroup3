const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');


const users = require('./routes/api/users');
const articles = require('./routes/api/articles');

const app = express();

// Connect Database
connectDB();

const port = process.env.PORT || 8082;

if (process.env.NODE_ENV ==='production'){
    app.use(express.static('seeds-app/build'));
}

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/articles', articles);
app.use('/api/users', users);

app.use(express.static(__dirname+'/seeds-app/build'));
app.get('*', (req, res) => {res.sendFile(__dirname+'/seeds-app/build/index.html')});



app.listen(port, () => console.log(`Server running on port ${port}`));