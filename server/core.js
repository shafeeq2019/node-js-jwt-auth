exports.mail = require("./app/mail/mail.js");
exports.logger = require('./app/logger.js');
exports.db = require('./app/models');
exports.controller = require('./app/controllers');
exports.schemas = require('./app/controllers/schemas.js');
exports.validator = require('./app/middleware/validator.js')