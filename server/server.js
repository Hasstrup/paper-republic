var express = require('express')
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
const port = 4400;
var cors = require('cors')
var Post = require('./models/post')
var Collection = require('./models/collection')
var LoadDB = require('./load')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost/artsy", {
    useMongoClient: true,
});


var postRoute = require('./routes/post')
var collectionRoute = require('./routes/collection')

app.use(postRoute);
app.use(collectionRoute);

app.listen(port, function(){
  console.log('server is listening on %s', port)
})
