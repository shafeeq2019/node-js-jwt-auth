// schemas.js 
const Joi = require('joi')
const schemas = {
    paginaiton: Joi.object().keys({
        size: Joi.number().min(1),
        page: Joi.number()
    }).unknown(true),
    comment: {
        post: Joi.object().keys({
            comment: Joi.string().required(),
            postId: Joi.number().min(1).required()
        }),
        put: Joi.object().keys({
            comment: Joi.string().required()
        }),
        getById: Joi.object().keys({
            postId: Joi.number().min(1),
            commentId: Joi.number().min(1).required()
        })
    },
    post: {
        post: Joi.object().keys({
            post: Joi.string().required(),
            scope: Joi.number().min(1).max(3).required()
        }),
        getById: Joi.object().keys({
            postId: Joi.number().min(1).required()
        }),
        postComment: {
            params: Joi.object().keys({
                postId: Joi.number().min(1).required()
            }),
            body: Joi.object().keys({
                comment: Joi.string().required()
            })
        }
    },
    like: {
        post: Joi.object().keys({
            postId: Joi.number().min(1).required()
        }),
        getById: Joi.object().keys({
            postId: Joi.number().min(1),
            likeId: Joi.number().min(1).required()
        })
    }

};
module.exports = schemas;