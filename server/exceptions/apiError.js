module.exports = class ApiError extends Error {
    status;
    errors;

    constructor( status, message, errors = [] ){
        super( message );
        this.status = status;
        this.errors = errors;
    }

    static unauthorizedError(){
        return new ApiError( 401, "Пользователь не авторизован" );
    }

    static accessError( message ){
        return new ApiError( 401, message );
    }

    static badRequest( message, errors = [] ){
        return new ApiError( 400, message, errors );
    }

    static serverSideError( message, errors = [] ){
        return new ApiError( 500, message, errors );
    }
}