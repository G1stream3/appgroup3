const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require('path');

const users = require('./routes/api/users');
const articles = require('./routes/api/articles');

const app = express();

// Connect Database
connectDB();

const port = process.env.PORT || 8080;

require("dotenv").config({path:"./config.env"});




if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "/speeds/build")));
      
        app.get("*", (req, res) => {
          res.sendFile(path.join(__dirname, "speeds", "build", "index.html"));
        });
      } else {
        app.get("/", (req, res) => {
          res.send("api running");
        });
      }
// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/articles', articles);
app.use('/api/users', users);

app.use(express.static(__dirname+'/speeds/build'));
app.get('*', (req, res) => {res.sendFile(__dirname+'/speeds/build/index.html')});



app.listen(port, () => console.log(`Server running on port ${port}`));