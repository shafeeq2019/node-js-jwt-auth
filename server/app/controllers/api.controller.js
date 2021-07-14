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
                errors: messages,
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
    }
}