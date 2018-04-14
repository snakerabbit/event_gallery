var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://user:password@ds243059.mlab.com:43059/eventgallery');
var Twitter = require('twitter-node-client').Twitter;

var config = {
    "consumerKey": 'AstEiS2reCPdVYGdq3fN7lloW',
    "consumerSecret": '30pksdC7Pvvd7PeFnkBmVwXlq2kU86nU93DeQkq4RMdU7kSyze',
    "accessToken": '958834013782786048-dHtXAvSncPz1iny1sO6XyUuRYqQmXso',
    "accessTokenSecret": 'muR2qPlfmPLGxl4D52MCZPjvBX1sSqFhKaleyFsyLCxGz'
};

var twitter = new Twitter(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

router.get('/', function(req, res) {
  res.json({message: 'this will be the main page'});
});

router.route('/posts')
  .get(function(req,res) {
    res.json({message: "this is where all the posts go"});
  });
router.route('/posts/:post_id')
  .get(function(req, res) {
    res.json({message: `post_id: ${req.params.post_id}`});
  });

router.route('/events')
  .get(function(req, res){
    res.json({message: "this is where all the events go"});
  });


app.use('/api', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
