let core = require('../../core.js')
const Op = core.db.Sequelize.Op;
module.exports = {
    createErrorMessage(msg, obj) {
        if (typeof (msg) === "string") {
            return {
                error: {
                    message: msg,
                    data: obj
                }
            }
        } else {
            let messages = {};
            msg.errors.forEach(error => {
                messages[error.path] = error.message;
            });
            return {
                error: messages,
                data: obj
            }
        }
    },
    sendDataWithUser(user, data) {
        return {
            user: {
                id: user.id,
                username: user.username
            },
            data: data
        }
    },
    getPagination(page, size) {
        const limit = size ? + size : 5;
        const offset = page ? page * limit : 0;

        return {
            limit,
            offset
        }
    },
    getPagingData(data, page, limit) {
        const {
            count: totalItems,
            rows: items
        } = data;
        const currentPage = page ? + page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            items,
            meta: {
                totalItems,
                totalPages,
                currentPage
            }
        }
    },
    getFilterCondition(params, query) {
        let result = {}
        for (p of params) {
            if (query[p.field] && p.type == 'string') {
                result[p.field] = {
                    [Op.iLike]: `%${query[p.field]}%`
                }
            }
            if (query[p.field] && p.type == 'integer') {
                result[p.field] = {
                    [Op.eq]: `${query[p.field]}`
                }
            }
        }
        return result;
    }


}