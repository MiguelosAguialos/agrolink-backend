class AuthException extends Error {
    constructor(title, message, code) {
        super(message)
        this.title = title
        this.message = message
        this.code = code
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AuthException