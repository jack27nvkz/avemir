const ApiError = require( "../exceptions/apiError" );

module.exports = function( error, req, res, next ){
    if( error instanceof ApiError ){
        return res.status( error.status ).json({ message: error.message, errors: error.errors });
    }

    //return res.status( 500 ).json({ message: "Непревиденная ошибка" });
    return res.status( 500 ).json( { 
        message: "Непревиденная ошибка",
        ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack,
            originalMessage: error.message
        })
    } );
}