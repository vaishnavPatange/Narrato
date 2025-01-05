class ApiErrors extends Error{
    constructor(
        statusCode=500,
        message="Something went wrong",
        error=[],
        stack=""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error,
        this.data = null,
        this.success = false
    }
}

module.exports = ApiErrors;