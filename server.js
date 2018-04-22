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
  res.json({message: 'API initialized'});
});


router.get('/events', function(req, res) {
  //POST  to create new event
  res.json({message: 'this is the main events page'});
});


router.route('/events/:event_id')
  .get(function(req, res){
    //GET individual event
    res.json({message: `this is event id: ${req.params.event_id}`});
  });

router.route('/events/:event_id/posts')
//GET posts
  .get(function(req,res) {
    let posts;
    var error = function (err, response, body) {
        console.log(err);
    };
    var success = function (data) {
      let parsed = JSON.parse(data);
      let statuses = parsed.statuses;
      let entities = statuses.map(stat => stat.entities);
      posts = entities.filter(ent => ent.media);
      res.json({posts: posts});
    };
    twitter.getSearch({'q':'#selfie','count': 10, 'filter':'images', 'include_entities':true}, error, success);
  });
router.route('/posts/:post_id')
  .get(function(req, res) {
    res.json({message: `post_id: ${req.params.post_id}`});
  });


app.use('/api', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
