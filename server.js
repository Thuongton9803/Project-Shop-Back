const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();


const port=process.env.PORT || 5000;

var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//router 

const sign = require('./route/sign');

app.use('/user',sign);
//
app.listen(port, ()=> {
    console.log(`Serveris running on port: ${port}`);
});



