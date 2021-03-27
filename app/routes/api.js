var express = require('express');
var Router = express.Router();


let api = {
  auth: require('./auth.routes'),
  user: require('./user.routes'),
  post: require('./post.routes'),
  like: require('./like.routes'),
  comment: require('./comment.routes')
}



Router.get('/', (req, res) => {
  res.send("Willkommen")
});



for (let [key, value] of Object.entries(api)) {
  Router.use(`/${value.path}`, value.router)
}


module.exports = Router;