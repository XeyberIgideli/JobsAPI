class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}
class Unauthenticated extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

export {CustomAPIError,BadRequest,Unauthenticated}