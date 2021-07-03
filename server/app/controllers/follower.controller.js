let core = require('../../core.js')
let db = core.db;
let moment = require('moment')
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.add = async (req, res, next) => {
    try {
        if (req.userId == req.body.followedId) {
            throw new Error("User can not follow his self !");
        }
        let follow = await db.follower.update({
            unfollowDate: null
        }, {
            where: {
                userId: req.userId,
                followedId: req.body.followedId,
                unfollowDate: {
                    [op.ne]: null
                }
            },
            returning: true
        });
        if (follow[0] == 0) {
            let follower = await db.follower.create({
                followerId: req.userId,
                followedId: req.body.followedId
            });
            delete follower.dataValues["unfollowDate"];
            res.status(200).send(follower);
        } else {
            delete follow[1][0].dataValues["unfollowDate"];
            res.status(200).send(follow[1][0]);
        }

    } catch (error) {
        console.log(error)
        res.status(404).send(error.message);
    }
}




exports.delete = async (req, res, next) => {
    try {
        let follow = await db.follower.findOne({
            where: {
                followerId: req.userId,
                followedId: req.body.followedId,
                unfollowDate: null
            }
        });
        if (!follow) {
            throw new Error(`no follower with id ${req.body.followedId} found !`);
        }
        follow.update({
            unfollowDate: moment.now()
        })
        res.status(200).send(`follow is deleted !`);
    } catch (error) {
        res.status(404).send(error.message);
    }
}




exports.getUserFollowers = async (req, res, next) => {
    try {
        let followers = await db.follower.findAll({
            where: {
                followedId: req.userId,
                unfollowDate: null
            },
            attributes: {
                exclude: ["unfollowDate", "userId", "followerId"]
            },
            include: [{
                model: db.user,
                as: 'follower',
                attributes: ["id", "username", "email"]
            }]
        });
        res.send(followers)

    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.getFollowers = async (req, res, next) => {
    try {
        let check = await checkUsersFollow(req, res);
        if (check) {
            let followers = await db.follower.findAll({
                where: {
                    followerId: req.body.userId,
                    unfollowDate: null
                },
                attributes: {
                    exclude: ["unfollowDate", "userId", "followerId"]
                },
                include: [{
                    model: db.user,
                    as: 'followed',
                    attributes: ["id", "username", "email"]
                }]
            });
            res.send(followers)
        } else {
            res.status(404).send("no right!")
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

let checkUsersFollow = async (req, res) => {
    let followers = await db.follower.findAll({
        where: {
            [op.or]: [{
                    followedId: req.body.userId,
                    followerId: req.userId,
                    unfollowDate: null
                },
                {
                    followedId: req.userId,
                    followerId: req.body.userId,
                    unfollowDate: null
                }
            ]
        }
    });

    if (followers.length == 2) {
        return true;
    } else {
        return false;
    }
}