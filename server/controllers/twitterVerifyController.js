const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
var Twitter = require('twitter');
const dotenv = require('dotenv');
const { users } = require("../models");
dotenv.config();

exports.twitterVerify = async (req, res, next) => {
  if (!req.body.twitterUserName) {
    res.status(400).send({
      message: "Username can not be empty!",
    });
    return;
  }
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });

  function getFollowersByPage(next_token){
    return new Promise((resolve, reject) => {
      client.get(`https://api.twitter.com/2/users/${process.env.TWEETID_FOR_FOLLOW}/followers?max_results=1000${next_token != '' ? '&pagination_token=' + next_token : ''}`, function (error, users, response) {
        if(error) 
          resolve(false);
        else
          resolve(users);
      });
    });
  }

  var verifiedUser = false;
  var next_token = '';

  do {
    followers = await getFollowersByPage(next_token);
    if(followers && followers.data){
      Object.keys(followers.data).map(function (key, index) {
        if (followers.data[index].username == req.body.twitterUserName) {
          verifiedUser = true;
          next_token = null;
        }
      });

      if(!verifiedUser && followers.meta && followers.meta.next_token){
        next_token = followers.meta.next_token;
      } else
        next_token = null;
    } else
      next_token = null;
  } while(next_token);

    User.findOne({
      where: {
        twitter_name: req.body.twitterUserName
      }
    }).then(data => {
      if (data) {
        res.json({
          success: false,
          msg: "Your twitter username is already registered.",
        })
      } else {
        if (verifiedUser) {
          res.json({
            success: true,
          })
        } else {
          res.json({
            success: false,
            msg: "You are not following our tweet.",
          })
        }
      }
    // })
  });
};

exports.retweetVerify = async (req, res, next) => {
  if (!req.body.twitterUserName) {
    res.status(400).send({
      message: "Username can not be empty!",
    });
    return;
  }
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });

  var verifiedUser = false;
  client.get(`https://api.twitter.com/2/tweets/${process.env.TWEETID}/retweeted_by`, function (error, tweets, response) {
    if (error) throw error;
    Object.keys(tweets.data).map(function (key, index) {
      if (tweets.data[index].username == req.body.twitterUserName) {
        verifiedUser = true;
        return;
      }
    });
    if (verifiedUser) {
      res.json({
        success: true,
      })
    } else {
      res.json({
        success: false,
        msg: "We cannot find your record on the list. If this continues, try again after few minutes."
      })
    }
  });
};