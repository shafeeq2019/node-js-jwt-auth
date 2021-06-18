mail = require('sendmail')();
const path = require("path");
const core = require("../../core.js")
module.exports = {
  async sendEmail(to, html, attachments) {
    mail({
           from: 'test@project.de',
           to: to,
           subject: 'test project',
           html: html,
           attachments: attachments
       },
       function(err,response){
          if(err){
            console.log(err)
             core.logger.error(err);
          }
    });
  }
};
