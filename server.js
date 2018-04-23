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
var config = {
    "consumerKey": 'AstEiS2reCPdVYGdq3fN7lloW',
    "consumerSecret": '30pksdC7Pvvd7PeFnkBmVwXlq2kU86nU93DeQkq4RMdU7kSyze',
    "accessToken": '958834013782786048-dHtXAvSncPz1iny1sO6XyUuRYqQmXso',
    "accessTokenSecret": 'muR2qPlfmPLGxl4D52MCZPjvBX1sSqFhKaleyFsyLCxGz'
};
var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter(config);


//************************WEB SOCKET IMPLEMENTATION ************************

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});
let posts;
let currentHashtag;
let currentEventId;
var error = function (err, response, body) {
    console.log(err);
};

let clients = {};
wss.on('connection', function(ws) {
  ws.send('opened!')
//   //30 requests per minute == 1 request every 2 seconds maximum
//   //https://developer.twitter.com/en/docs/basics/rate-limits.html;
  ws.on('message', function (event){
    let currentEvent= JSON.parse(event);
    if(!clients[currentEvent._id]){
      clients[currentEvent._id] = ws;
    }
    Event.findOne({_id: currentEvent._id}, function(err, event){
      if(err){
        console.log('didnt find event');
      }
      let dbEvent = event;
      setInterval(function(){
          twitter.getSearch({'q':`#${dbEvent.hashtag}`,'count': 10, 'filter':'images', 'include_entities':true}, error, function success(data){
            let parsed = JSON.parse(data);
            let statuses = parsed.statuses;
            posts = statuses.filter(status => status.entities.media);
            console.log(posts);
            posts.forEach(post =>{
              Post.findOne({tweet_id: post.id_str}, function(error, foundpost){
                if(foundpost){
                  posts = posts.filter(otherpost => otherpost.id_str !== post.id_str);
                  Post.remove({tweet_id: post.id});
                }
                let newPost = new Post();
                newPost.user = post.user.name;
                newPost.tweet_id = post.id_str;
                newPost.tweet_url = `https://twitter.com/${post.user.screen_name}/status/${post.id_str}`;
                newPost.created_at = post.created_at;
                newPost.media_url = post.entities.media[0].media_url;
                newPost.event_id = dbEvent.id;
                newPost.profile_pic_url = post.user.profile_image_url;
                newPost.save(function(err) {
                  if (err){
                    console.log(err);
                  }
                });
                  dbEvent.posts.unshift(newPost);

              })

              if(dbEvent.posts.length > 20){
                dbEvent.posts.shift();
              }
          });
          dbEvent.save(function(err, ev){
            ws.send(JSON.stringify(dbEvent));
          });

      });
    }, 3000);
  });

})
//
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


router.route('/events')
.get(function(req, res) {
  Event.find(function(err, events){
      res.json(events);
  })

})
.post(function(req, res){
  console.log(req);
  let newEvent = new Event();
  newEvent.name = req.body.event.name;
  newEvent.hashtag = req.body.event.hashtag;
  newEvent.posts = [];
  Post.find({tweet_id: newEvent._id}, function(err, posts){
    newEvent.posts = posts;
  })
  newEvent.save(function(err, event) {
    if (err){
            res.send(err);
    }
    res.json(event);
  });
});

// router.route('/test')
// .get(function(req, res){
//   Post.find({event_id: currentEventId}, function(err, allposts){
//         res.json({posts: allposts})
//   });
// })
router.route('/events/:event_id')
  .get(function(req, res){
    Event.findOne({_id: req.params.event_id}, function(err, event){
      if(err){
        console.log(err);
      }
      res.json(event)
    })
  });
//
// router.route('/events/:event_id/posts')
//   .get(function(req,res) {
//     Post.find({event_id: req.params.event_id}, function(err, allposts){
//           res.json({posts: allposts})
//     });
//
//   });
//
// router.route('/posts/:post_id')
//   .get(function(req, res) {
//     res.json({message: `post_id: ${req.params.post_id}`});
//   });


app.use('/api', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
