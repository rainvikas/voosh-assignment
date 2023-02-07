const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://vikas_yadav:vikasyadav@cluster0.r7ukdxt.mongodb.net/vooshassignment", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on '))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});


