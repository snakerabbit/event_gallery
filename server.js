var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://user:password@ds243059.mlab.com:43059/eventgallery');
var Post = require('./model/posts');
var Event = require('./model/events');

//************************ TWITTER CLIENT SETUP     ************************
var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter(config);
var config = {
    "consumerKey": 'AstEiS2reCPdVYGdq3fN7lloW',
    "consumerSecret": '30pksdC7Pvvd7PeFnkBmVwXlq2kU86nU93DeQkq4RMdU7kSyze',
    "accessToken": '958834013782786048-dHtXAvSncPz1iny1sO6XyUuRYqQmXso',
    "accessTokenSecret": 'muR2qPlfmPLGxl4D52MCZPjvBX1sSqFhKaleyFsyLCxGz'
};

//************************WEB SOCKET IMPLEMENTATION ************************

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});
let posts;
var error = function (err, response, body) {
    console.log(err);
};

var success = function (data) {
  let parsed = JSON.parse(data);
  let statuses = parsed.statuses;
  posts = statuses.filter(status => status.entities.media);
  posts.forEach(post =>{
    Post.findOne({tweet_id: post.id_str}, function(err, foundPost){
        let newPost = foundPost || new Post();
        newPost.user = post.user.name;
        newPost.tweet_id = post.id_str;
        newPost.tweet_url = `https://twitter.com/${post.user.screen_name}/status/${post.id_str}`;
        newPost.created_at = post.created_at;
        newPost.media_url = post.entities.media[0].expanded_url;
        newPost.event_id = 1;
        newPost.profile_pic_url = post.user.profile_image_url;
        console.log(newPost);
        newPost.save(function(err) {
          if (err){
            console.log(err);
          }
        });
      }
    )
  });
};

wss.on('connection', function(ws) {
  ws.send('opened!')
  //30 requests per minute == 1 request every 2 seconds maximum
  //https://developer.twitter.com/en/docs/basics/rate-limits.html
  setInterval(function(){
    twitter.getSearch({'q':'#selfie','count': 10, 'filter':'images', 'include_entities':true}, error, success);
    ws.send('posts updated');
  }, 3000);

});


//************************ ROUTES ************************

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
}).post(function(req, res){
  var event = new Event();
  (req.body.name) ? event.name = req.body.name : null;
  (req.body.hashtag) ? comment.hashtag = req.body.hashtag : null;

  event.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Comment successfully added!' });
  });
});


router.route('/events/:event_id')
  .get(function(req, res){
    res.json({message: `this is event id: ${req.params.event_id}`});
  });

router.route('/events/:event_id/posts')
//GET posts
  .get(function(req,res) {

    res.json({posts: posts})
  });

router.route('/posts/:post_id')
  .get(function(req, res) {
    res.json({message: `post_id: ${req.params.post_id}`});
  });


app.use('/api', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
