class ApiError extends Error {          
    constructor(
        statusCode, 
        message= "Something went wrong",
        error=[],
        stack=""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
        
        if (stack) {
            this.stack = stack;
        }
    }
}

export { ApiError };