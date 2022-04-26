const db = require("../models");
const User = db.waitlist;
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

exports.discordVerify = async (req, res, next) => {
  if (!req.body.discordUserName) {
    res.status(400).send({
      message: "Discord Username can not be empty!",
    });
    return;
  }

  await Promise.all([
    discordReady(client),
    client.login(process.env.DISCORD_TOKEN),
  ]);

  const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID);
  const members = await guild.members.fetch();
  const checkMember = members.filter(member => member && member.user && member.user.bot == false && member.user.username + '#' + member.user.discriminator == req.body.discordUserName);
  User.findOne({
    where: {
      discord_name: req.body.discordUserName
    }
  }).then(data => {
    if (data) {
      res.json({
        success: false,
        msg: "Your discord username is already registered."
      })
    } else {
      if (checkMember.size) {
        res.json({
          success: true,
        })
      } else {
        res.json({
          success: false,
          msg: "We cannot find your ID on our discord."
        })
      }
    }
  })


  // --------------------for test--------------------
  // User.findOne({
  //   where: {
  //     discord_name: req.body.discordUserName
  //   }
  // }).then(data => {
  //   if (data) {
  //     res.json({
  //       success: false,
  //       msg: "Your discord username is already registered"
  //     })
  //   } else {
  //     res.json({
  //       success: true,
  //     })
  //   }
  // })

};