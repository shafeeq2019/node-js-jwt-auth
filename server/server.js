const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const core = require("./core.js");
// Admin panel 

AdminBro.registerAdapter(AdminBroSequelize)
const AdminBroDB = new AdminBro({
  rootPath: '/admin',
  databases: [core.db],
  resources: [{
    resource: core.db.post,
    options: {
      //...
    }
  }],
  branding: {
    companyName: 'XYZ c.o.',
  },
})

const router = AdminBroExpress.buildRouter (AdminBroDB)
app.use(AdminBroDB.options.rootPath, router)




app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",function(req, res, next) {
  var fullUrl = "new request " + req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(fullUrl);
  next();
})

app.use("/", core.validator(core.schemas.paginaiton, 'query'));

//api-docs



// database
const db = require("./app/models");



// force: true will drop the table if it already exists
  // db.sequelize.sync({force: true}).then(() => {
  //  console.log('Drop and Resync Database with { force: true }');
  //   initial();
  //  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shafeeq application." });
});


const api = require('./app/routes/api.js')
app.use('/api/v1/', api);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });

  db.role.create({
    id: 2,
    name: "moderator"
  });

  db.role.create({
    id: 3,
    name: "admin"
  });

  db.scope.create({
    id: 1,
    name: "public"
  });

  db.scope.create({
    id: 2,
    name: "follower"
  });

  db.scope.create({
    id: 3,
    name: "private"
  });
}

// const Joi = require('joi'); 
// const schema = Joi.object().keys({ 
//   name: Joi.string().alphanum().min(3).max(30).required(),
//   birthyear: Joi.number().integer().min(1970).max(2013), 
// }); 
// const dataToValidate = { 
//   name:'10.10.1990', 
//   birthyear: 1971 
// } 
// const result = schema.validate(dataToValidate); 
// console.log(result)