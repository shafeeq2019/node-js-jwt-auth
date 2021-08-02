const Joi = require('joi');
const core = require('../../core.js')
const validator = (schema, property) => {
    return (req, res, next) => {
        const {
            error
        } = schema.validate(req[property]);

        const valid = error == null;
        if (valid) {
            next();
        } else {
            const {
                details
            } = error;
            const message = details.map(i => i.message).join(',');
            core.logger.error("error", message);
            res.status(422).send(core.controller.api.createErrorMessage(message))
        }
    }
}





module.exports = validator;