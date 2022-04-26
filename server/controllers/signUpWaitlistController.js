const db = require("../models");
const WaitList = db.waitlist;
const Op = db.Sequelize.Op;
const dotenv = require('dotenv');
dotenv.config();

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


function addressCheck(address) {
    return new Promise((resolve, reject) => {
        WaitList.findOne({
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

function twitterCheck(twitterUserName) {
    return new Promise((resolve, reject) => {
        WaitList.findOne({
            where: {
                twitter_name: twitterUserName
            }
        }).then(data => {
            if (data) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

function discordCheck(members, discordUserName) {
  return new Promise((resolve, reject) => {
    const checkMember = members.filter(member => member && member.user && member.user.bot == false && member.user.username + '#' + member.user.discriminator == discordUserName);
    WaitList.findOne({
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

exports.signUpWaitList = async (req, res, next) => {
    if (!req.body.address || !req.body.twitterUserName || !req.body.discordUserName || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    var checkAddress, checkTwitter, checkDiscord;

    //----------------------Balance Check------------------------

    let chkAddress = await addressCheck(req.body.address);
    if (!chkAddress) {
        res.json({
            success: false,
            msg: "Your address already exist."
        });
        checkBalance = false
    } else {
        checkBalance = true
    }

    // ---------------Twitter verify-----------------

    checkTwitter = await twitterCheck(req.body.twitterUserName);
    if (!checkTwitter) {
        res.json({
            success: false,
            msg: "Your twitter username is already registered."
        });
        checkTwitter = false;
    } else {
        checkTwitter = true;
    }

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

    if (checkBalance == true && checkTwitter == true && checkDiscord == true) {
        const user = {
            address: req.body.address,
            twitter_name: req.body.twitterUserName,
            discord_name: req.body.discordUserName,
            email: req.body.email ? req.body.email : "",
        };

        // ----------------Save Tutorial in the database-----------------
        WaitList.create(user)
            .then(data => {
                res.json({
                    success: true
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    checkAddress: checkAddress,
                    checkTwitter: checkTwitter,
                    checkDiscord: checkDiscord,
                    message: 'DB Error.'
                });
            });
    } else {
        res.json({
            success: false,
            checkAddress: checkAddress,
            checkTwitter: checkTwitter,
            checkDiscord: checkDiscord,
            message: 'Check Steps went false.'
        });
    }
};