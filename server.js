const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const expressValidator = require('express-validator');
global.config = require('./modules/config');


// connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/api-node',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//     name: {type: String, required: true}
// });
//
// const userModel = mongoose.model('a', UserSchema);
// new userModel({
//     name : "amirezaafthi"
// }).save(err => {
//     if(err) throw err;
// })

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(express.json());
app.use('/public',express.static('public'));


const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

app.use('/api', apiRouter);
app.use('/', webRouter);

app.listen(config.port, () => {
    console.log(`Server running ap port ${config.port}`)
})