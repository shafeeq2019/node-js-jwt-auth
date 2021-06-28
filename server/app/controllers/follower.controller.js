let core = require('../../core.js')
let db = core.db;

// exports.add = async (req, res, next) => {
//     try {
//         let check = await db.follower.findAll({
//             where: {
//                 followerId: req.userId,
//                 followedId: req.body.followedId
//             }
//         });
//         if (check.length == 0) {
//             let follower = await db.follower.create({
//                 followerId: req.userId,
//                 followedId: req.body.followedId
//             });
//             res.status(200).send(follower);
//         } else {
//             res.send("you are already following this user")
//         }
//     } catch (error) {
//         res.status(404).send(error);
//     }
// }

exports.add = async (req, res, next) => {
    try {
  
            let follower = await db.follower.create({
                followerId: req.userId,
                followedId: req.body.followedId
            });
            res.status(200).send(follower);

    } catch (error) {
        res.status(404).send(error);
    }
}