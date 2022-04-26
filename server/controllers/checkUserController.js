const db = require("../models");
const BN = require("bn.js");
const User = db.waitlist;
const Op = db.Sequelize.Op;

exports.checkUser = async (req, res, next) => {
    if (!req.body.address) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    User.findOne({
        where: {
            address: req.body.address
        }
    }).then(data => {
        if (data) {
            res.json({
                success: false,
                msg: "You are already registered."
            })
        } else {
            res.json({
                success: true,
            });
        }
    })
}