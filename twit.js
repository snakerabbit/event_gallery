var error = function (err, response, body) {
    console.log(err);
};
var success = function (data) {
  let parsed = JSON.parse(data);
  let statuses = parsed.statuses;
  let entities = statuses.map(stat => stat.entities);
  let filtered = entities.filter(ent => ent.media);
  console.log(filtered);
};

var Twitter = require('twitter-node-client').Twitter;

var config = {
    "consumerKey": 'AstEiS2reCPdVYGdq3fN7lloW',
    "consumerSecret": '30pksdC7Pvvd7PeFnkBmVwXlq2kU86nU93DeQkq4RMdU7kSyze',
    "accessToken": '958834013782786048-dHtXAvSncPz1iny1sO6XyUuRYqQmXso',
    "accessTokenSecret": 'muR2qPlfmPLGxl4D52MCZPjvBX1sSqFhKaleyFsyLCxGz'
};

var twitter = new Twitter(config);

twitter.getSearch({'q':'#selfie','count': 10, 'filter':'images', 'include_entities':true}, error, success);
//user: String
//tweet_id: String
//tweet_url: String
//created_at: DateTime
//media_url: String
//event_id: Number
//profile_pic_url: String
// {"created_at":
//   "Fri Apr 13 00:25:35 +0000 2018",
//   "id":984588372508262400,
//   "id_str":"984588372508262400",
//   "text":"RT @alexmarquez73: #Minneapolis 🇺🇸 https://t.co/4NcF6oWNSz",
//   "truncated":false,
//   "entities":{
//     "hashtags":[{"text":"Minneapolis","indices":[19,31]}],
//     "symbols":[],
//     "user_mentions":[{"screen_name":"alexmarquez73","name":"Alex Márquez","id":1573051255,"id_str":"1573051255","indices":[3,17]}],
//     "urls":[],
//     "media":[
//       {
//         "id":984525446028001300,
//         "id_str":"984525446028001280",
//         "indices":[35,58],
//         "media_url":"http://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//         "media_url_https":"https://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//         "url":"https://t.co/4NcF6oWNSz",
//         "display_url":"pic.twitter.com/4NcF6oWNSz",
//         "expanded_url":"https://twitter.com/alexmarquez73/status/984525454983000064/photo/1",
//         "type":"photo",
//         "sizes":{
//           "large":{
//             "w":1536,
//             "h":2048,
//             "resize":"fit"
//           },
//           "thumb":{
//             "w":150,
//             "h":150,
//             "resize":"crop"
//           },
//           "medium":{
//             "w":900,
//             "h":1200,
//             "resize":"fit"
//           },
//           "small":{
//             "w":510,
//             "h":680,
//             "resize":"fit"
//           }
//         },
//         "source_status_id":984525454983000000,
//         "source_status_id_str":"984525454983000064",
//         "source_user_id":1573051255,
//         "source_user_id_str":"1573051255"
//       }
//     ]
//   },
//   "extended_entities":{
//     "media":[
//       {
//         "id":984525446028001300,
//         "id_str":"984525446028001280",
//         "indices":[35,58],
//         "media_url":"http://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//         "media_url_https":"https://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//         "url":"https://t.co/4NcF6oWNSz",
//         "display_url":"pic.twitter.com/4NcF6oWNSz",
//         "expanded_url":"https://twitter.com/alexmarquez73/status/984525454983000064/photo/1",
//         "type":"photo",
//         "sizes":{
//           "large":{
//             "w":1536,
//             "h":2048,
//             "resize":"fit"
//           },
//           "thumb":{
//             "w":150,
//             "h":150,
//             "resize":"crop"
//           },
//           "medium":{
//             "w":900,
//             "h":1200,
//             "resize":"fit"
//           },
//           "small":{
//             "w":510,
//             "h":680,
//             "resize":"fit"
//           }
//         },
//         "source_status_id":984525454983000000,
//         "source_status_id_str":"984525454983000064",
//         "source_user_id":1573051255,
//         "source_user_id_str":"1573051255"
//       }
//     ]
//   },
//   "metadata":{
//     "iso_language_code":"und",
//     "result_type":"recent"
//   },
//   "source":"<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
//   "in_reply_to_status_id":null,
//   "in_reply_to_status_id_str":null,
//   "in_reply_to_user_id":null,
//   "in_reply_to_user_id_str":null,
//   "in_reply_to_screen_name":null,
//   "user":{
//     "id":795963986650939400,
//     "id_str":"795963986650939392",
//     "name":"Riko",
//     "screen_name":"tweetnyariko",
//     "location":"Yogyakarta, Indonesia",
//     "description":"",
//     "url":null,
//     "entities":{
//       "description":{
//         "urls":[]
//       }
//     },
//     "protected":false,
//     "followers_count":254,
//     "friends_count":201,
//     "listed_count":26,
//     "created_at":"Tue Nov 08 12:19:37 +0000 2016",
//     "favourites_count":404,
//     "utc_offset":null,
//     "time_zone":null,
//     "geo_enabled":true,
//     "verified":false,
//     "statuses_count":77602,
//     "lang":"id",
//     "contributors_enabled":false,
//     "is_translator":false,
//     "is_translation_enabled":false,
//     "profile_background_color":"F5F8FA"
//     ,"profile_background_image_url":null,
//     "profile_background_image_url_https":null,
//     "profile_background_tile":false,
//     "profile_image_url":"http://pbs.twimg.com/profile_images/795993488588345344/SZ0v_Ys1_normal.jpg",
//     "profile_image_url_https":"https://pbs.twimg.com/profile_images/795993488588345344/SZ0v_Ys1_normal.jpg",
//     "profile_banner_url":"https://pbs.twimg.com/profile_banners/795963986650939392/1478614609",
//     "profile_link_color":"1DA1F2",
//     "profile_sidebar_border_color":"C0DEED",
//     "profile_sidebar_fill_color":"DDEEF6",
//     "profile_text_color":"333333",
//     "profile_use_background_image":true,
//     "has_extended_profile":true,
//     "default_profile":true,
//     "default_profile_image":false,
//     "following":false,
//     "follow_request_sent":false,
//     "notifications":false,
//     "translator_type":"none"
//   },
//   "geo":null,
//   "coordinates":null,
//   "place":null,
//   "contributors":null,
//   "retweeted_status":{
//     "created_at":"Thu Apr 12 20:15:34 +0000 2018",
//     "id":984525454983000000,
//     "id_str":"984525454983000064",
//     "text":"#Minneapolis 🇺🇸 https://t.co/4NcF6oWNSz",
//     "truncated":false,
//     "entities":{
//       "hashtags":[
//         {
//           "text":"Minneapolis",
//           "indices":[0,12]
//         }
//       ],
//       "symbols":[],
//       "user_mentions":[],
//       "urls":[],
//       "media":[
//         {"id":984525446028001300,
//         "id_str":"984525446028001280",
//         "indices":[16,39],
//         "media_url":"http://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//         "media_url_https":"https://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//         "url":"https://t.co/4NcF6oWNSz",
//         "display_url":"pic.twitter.com/4NcF6oWNSz",
//         "expanded_url":"https://twitter.com/alexmarquez73/status/984525454983000064/photo/1",
//         "type":"photo",
//         "sizes":{
//           "large":{
//             "w":1536,
//             "h":2048,
//             "resize":"fit"
//           },
//           "thumb":{
//             "w":150,
//             "h":150,
//             "resize":"crop"
//           },
//           "medium":{
//             "w":900,
//             "h":1200,
//             "resize":"fit"
//           },
//           "small":{
//             "w":510,
//             "h":680,
//             "resize":"fit"
//           }
//         }
//       }
//     ]
//   },
//   "extended_entities":
//   {"media":
//   [
//     {"id":984525446028001300,
//     "id_str":"984525446028001280",
//     "indices":[16,39],
//     "media_url":"http://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//     "media_url_https":"https://pbs.twimg.com/media/Dam8rUrVAAACfS5.jpg",
//     "url":"https://t.co/4NcF6oWNSz",
//     "display_url":"pic.twitter.com/4NcF6oWNSz",
//     "expanded_url":"https://twitter.com/alexmarquez73/status/984525454983000064/photo/1",
//     "type":"photo",
//     "sizes":{
//       "large":{
//         "w":1536,
//         "h":2048,
//         "resize":"fit"
//       },
//       "thumb":{
//         "w":150,
//         "h":150,
//         "resize":"crop"
//       },
//       "medium":{
//         "w":900,
//         "h":1200,
//         "resize":"fit"
//       },
//       "small":{
//         "w":510,
//         "h":680,
//         "resize":"fit"
//       }
//     }
//   }
// ]
// },
// "metadata":{
//   "iso_language_code":"und",
//   "result_type":"recent"
// },
// "source":"<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
// "in_reply_to_status_id":null,
// "in_reply_to_status_id_str":null,
// "in_reply_to_user_id":null,
// "in_reply_to_user_id_str":null,
// "in_reply_to_screen_name":null,
// "user":{
//   "id":1573051255,
//   "id_str":"1573051255",
//   "name":"Alex Márquez",
//   "screen_name":"alexmarquez73",
//   "location":"Cervera",
//   "description":"Moto2 Rider #73 @ Estrella Galicia 0,0 - Marc VDS Racing Team | @FanClubAM73",
//   "url":"https://t.co/V31psoZVJE",
//   "entities":
//   {"url":
//   {"urls":
