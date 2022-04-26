const db = require("../models");
const User = db.users;
const MintHistory = db.minthistory;
const dotenv = require('dotenv');
dotenv.config();
var Web3 = require("web3");
web3 = new Web3( new Web3.providers.HttpProvider( process.env.RINKEBY_WEB3_PROVIDER ) );
const OliveNFT = require("../abi/OliveNFT.json");
const contract = new web3.eth.Contract(OliveNFT.abi, process.env.CONTRACT_ADDRESS);
const sequelize = require('sequelize');
const Op = sequelize.Op;
const Account = require('eth-lib/lib/account');
const ethereumjsUtil = require('ethereumjs-util');

exports.checkMintable = async (req, res, next) => {
    if (!req.body.address) {
        res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
        return;
    }

    const totalToken = await contract.methods.totalToken().call();
    if(totalToken < parseInt(process.env.TOKEN_ID_END)){
        if(process.env.PRESALE == "true"){
            const user = await User.findOne({ where: { address: req.body.address } });
            if(user){
                try{
                    const tokens = await contract.methods.walletOfOwner(req.body.address).call();
                    const curColTokens = tokens.filter(token => parseInt(token) >= parseInt(process.env.TOKEN_ID_START) && parseInt(token) <= parseInt(process.env.TOKEN_ID_END));
                    if(curColTokens.length < user.max_mint){
                        res.json({
                            success: true,
                            count: parseInt(user.max_mint) - curColTokens.length
                        })
                    } else {
                        res.json({
                            success: false,
                            minted: true,
                            message: "Congrats, you already minted all your tokens!"
                        });
                    }
                } catch {
                    res.json({
                        success: false,
                        message: "Sorry, please try again later.",
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: "Sorry, we cannot find your record on our whitelist."
                });
            }
        } else {
            try{
                const tokens = await contract.methods.walletOfOwner(req.body.address).call();
                const curColTokens = tokens.filter(token => parseInt(token) >= parseInt(process.env.TOKEN_ID_START) && parseInt(token) <= parseInt(process.env.TOKEN_ID_END));
                if(curColTokens.length >= parseInt(process.env.PUBLICSALE_MAX_MINT)){
                    res.json({
                        success: false,
                        minted: true,
                        message: "Congrats, you already minted all your tokens!"
                    })
                } else {
                    res.json({
                        success: true,
                        count: parseInt(process.env.PUBLICSALE_MAX_MINT) - curColTokens.length
                    });
                }
            } catch {
                res.json({
                    success: false,
                    message: "Sorry, please try again later.",
                })
            }
        }
    } else {
        res.json({
            success: false,
            soldout: true,
            message: "All tokens sold out in this collection.",
        })
    }
}

exports.getMintData = async (req, res, next) => {
    if (!req.body.address || !req.body.count) {
        res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
        return;
    }

    const checkstamp = parseInt(new Date().getTime() / 1000);
    const history = await MintHistory.findAll({ where: { address: req.body.address, timestamp: { [Op.gt]: checkstamp - 30 } } });
    
    if(history.length > 0){
        res.json({
            success: false,
            message: "Sorry, you recently tried mint. Please try again after a minute.",
        });
    } else {
        const totalToken = await contract.methods.totalToken().call();
        if(totalToken < parseInt(process.env.TOKEN_ID_END)){
            if(process.env.PRESALE == "true"){
                const user = await User.findOne({ where: { address: req.body.address } });
                if(user){
                    try{
                        const tokens = await contract.methods.walletOfOwner(req.body.address).call();
                        const curColTokens = tokens.filter(token => parseInt(token) >= parseInt(process.env.TOKEN_ID_START) && parseInt(token) <= parseInt(process.env.TOKEN_ID_END));
                        if(curColTokens.length + parseInt(req.body.count) > user.max_mint) {
                            res.json({
                                success: false,
                                message: "Sorry, your request is out of range!"
                            });
                            return;
                        }
                    } catch {
                        res.json({
                            success: false,
                            message: "Sorry, please try again later.",
                        });
                        return;
                    }
                } else {
                    res.json({
                        success: false,
                        message: "Sorry, we cannot find your record on our whitelist."
                    });
                    return;
                }
            } else {
                try{
                    const tokens = await contract.methods.walletOfOwner(req.body.address).call();
                    const curColTokens = tokens.filter(token => parseInt(token) >= parseInt(process.env.TOKEN_ID_START) && parseInt(token) <= parseInt(process.env.TOKEN_ID_END));
                    if(curColTokens.length + parseInt(req.body.count) > parseInt(process.env.PUBLICSALE_MAX_MINT)){
                        res.json({
                            success: false,
                            message: "Sorry, your request is out of range!"
                        });
                        return;
                    }
                } catch {
                    res.json({
                        success: false,
                        message: "Sorry, please try again later.",
                    })
                    return;
                }
            }
        } else {
            res.json({
                success: false,
                message: "Sorry, all tokens sold out in this collection.",
            })
            return;
        }

        MintHistory.create({ address: req.body.address, timestamp: parseInt(new Date().getTime() / 1000), count: req.body.count });

        const timestamp = parseInt(new Date().getTime() / 1000);
        
        // Data Pack
        const data = web3.eth.abi.encodeParameters(
            ['address', 'uint256', 'uint256'],
            [req.body.address, parseInt(req.body.count), timestamp]
        );
        
        // Signature Generate
        const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
        const messageBytes = web3.utils.hexToBytes(messageHex);
        const messageBuffer = Buffer.from(messageBytes);
        const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
        const signature = Account.sign(hash, process.env.PRIVATE_KEY);
        res.json({
            success: true,
            tokenAmount: parseInt(req.body.count),
            timestamp: timestamp,
            signature: signature,
            price: process.env.CURRENT_NFT
        })
    }
}