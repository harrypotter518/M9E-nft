const db = require("../models");
const BN = require("bn.js");
var Twitter = require('twitter');
const User = db.users;
const Op = db.Sequelize.Op;
const dotenv = require('dotenv');
dotenv.config();

var Web3 = require("web3");
web3 = new Web3(
  new Web3.providers.HttpProvider(
    process.env.WEB3_PROVIDER
  )
);
const {
  Client,
  Intents
} = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({
  intents: myIntents
});

var initialized = false;

function discordReady(client) {
  if (initialized)
    return new Promise((resolve, reject) => {
      resolve();
    });
  return new Promise((resolve, reject) => {

    client.once('ready', async () => {
      initialized = true;
      console.log(`Logged in as ${client.user.tag}!`);
      resolve();
    });
  })
}

var twitter_client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

function addressCheck(address) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        address: address
      }
    }).then(data => {
      if (data) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  });
}

// function getFollowersByPage(next_token){
//   return new Promise((resolve, reject) => {
//     twitter_client.get(`https://api.twitter.com/2/users/${process.env.TWEETID_FOR_FOLLOW}/followers?max_results=1000${next_token != '' ? '&pagination_token=' + next_token : ''}`, function (error, users, response) {
//       if(error) 
//         resolve(false);
//       else
//         resolve(users);
//     });
//   });
// }

// function twitterFollowCheck(twitterUserName) {
//   return new Promise((resolve, reject) => {
//     User.findOne({
//       where: {
//         twitter_name: twitterUserName
//       }
//     }).then(data => {
//       if (data) {
//         resolve(false);
//       } else {
//         resolve(true);
//       }
//     })
//   })
// }

function retweetCheck(twitterUserName) {
  return new Promise((resolve, reject) => {
    var verifiedRetweetUser = false;
    twitter_client.get(`https://api.twitter.com/2/tweets/${process.env.TWEETID}/retweeted_by`, function (error, tweets, response) {
    if (error) throw error;
    Object.keys(tweets.data).map(function (key, index) {
      if (tweets.data[index].username == twitterUserName) {
        verifiedRetweetUser = true;
        return;
      }
    });
    if (verifiedRetweetUser) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
  })
}

function discordCheck(members, discordUserName) {
  return new Promise((resolve, reject) => {
    const checkMember = members.filter(member => member && member.user && member.user.bot == false && member.user.username + '#' + member.user.discriminator == discordUserName);
    User.findOne({
      where: {
        discord_name: discordUserName
      }
    }).then(data => {
      if (data) {
        resolve("Your discord username is already registered.");
      } else {
        if (checkMember.size) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  })
}

exports.signUp = async (req, res, next) => {
  if (!req.body.address || !req.body.twitterUserName || !req.body.discordUserName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  var checkBalance, checkRetweet, checkDiscord;

  //----------------------Balance Check------------------------
  var balance;
  await web3.eth.getBalance(req.body.address, (err, bal) => {
    if (err) {
      return console.error(err);
    }
    balance = web3.utils.toBN(bal);
  });
  var nftValue = process.env.NFT_VALUE;

  var nftWeiValue = web3.utils.toBN(
    web3.utils.toWei(nftValue, "ether").toString()
  );

  let chkAddress = await addressCheck(req.body.address);
  if(!chkAddress)
    res.json({
      success: false,
      msg: "Your address already exist."
    });

  if (nftWeiValue.cmp(balance) == 1) {
    checkBalance = false
    res.json({
      success: false,
      msg: "Your Balance is not enough to mint."
    });
  } else {
    checkBalance = true
  }

   // ---------------Twitter verify-----------------

  //  var verifiedUser = false;
  //  var next_token = '';

  //  do {
  //    followers = await getFollowersByPage(next_token);
  //    if(followers && followers.data){
  //      Object.keys(followers.data).map(function (key, index) {
  //        if (followers.data[index].username == req.body.twitterUserName) {
  //          verifiedUser = true;
  //          next_token = null;
  //        }
  //      });
 
  //      if(!verifiedUser && followers.meta && followers.meta.next_token){
  //        next_token = followers.meta.next_token;
  //      } else
  //        next_token = null;
  //    } else
  //      next_token = null;
  //  } while(next_token);
   
  // if(!verifiedUser)
  //   res.json({
  //     success: false,
  //     msg: "You are not following our tweet."
  //   });
  // else {
  //   checkTwitter = await twitterFollowCheck(req.body.twitterUserName);
  //   if(!checkTwitter)
  //     res.json({
  //       success: false,
  //       msg: "Your twitter username is already registered."
  //     });
  // }

  // ---------------Retweet verify-----------------
  checkRetweet = await retweetCheck(req.body.twitterUserName);
  if(!checkRetweet)
    res.json({
      success: false,
      msg: "We cannot find your record on the list. If this continues, try again after few minutes."
    });

  // ----------------------Discord verify--------------------
  await Promise.all([
    discordReady(client),
    client.login(process.env.DISCORD_TOKEN),
  ]);

  const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID);
  const members = await guild.members.fetch();
  checkDiscord = await discordCheck(members, req.body.discordUserName);
  if(checkDiscord === false)
    res.json({
      success: false,
      msg: "We cannot find your ID on our discord."
    });
  else if(checkDiscord !== true)
    res.json({
      success: false,
      msg: checkDiscord
    });
  
  if(checkBalance == true && checkRetweet == true && checkDiscord == true){
    const user = {
      address: req.body.address,
      twitter_name: req.body.twitterUserName,
      discord_name: req.body.discordUserName,
      email: req.body.email ? req.body.email : "",
    };
  
    // Save Tutorial in the database
    User.create(user)
      .then(data => {
        res.json({
          success: true
        });
      })
      .catch(err => {
        res.json({
          success: false, checkBalance: checkBalance, checkRetweet: checkRetweet, checkDiscord: checkDiscord, message: 'DB Error.'
        });
      });
  } else {
    res.json({
      success: false, checkBalance: checkBalance, checkRetweet: checkRetweet, checkDiscord: checkDiscord, message: 'Check Steps went false.'
    });
  }
};
