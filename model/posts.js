var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostsSchema = new Schema({
  user: String,
  tweet_id: String,
  tweet_url: String,
  created_at: String,
  media_url: String,
  event_id: Number,
  profile_pic_url: String
});


//user: String
//tweet_id: String
//tweet_url: String
//created_at: DateTime
//media_url: String
//event_id: Number
//profile_pic_url: String
module.exports = mongoose.model('Event', PostsSchema);
