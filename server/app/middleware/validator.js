const Joi = require('joi');
const core = require('../../core.js')
const validator = (schema, property) => {
    return (req, res, next) => {
        let data;
        if (typeof (property) === 'object') {
            for (p of property) {
                console.log(req[p])
                data = {
                    ...data,
                    ...req[p]
                }
            }
        } else if (typeof (property) === 'string') {
            data = req[property]
        }
        console.log(data)
        const {
            error
        } = schema.validate(data);

        const valid = error == null;
        if (valid) {
            next();
        } else {
            const {
                details
            } = error;
            const message = details.map(i => i.message).join(',');
            console.log("error", message);
            res.status(422).send(core.controller.api.createErrorMessage(message))
        }
    }
}



module.exports = validator;