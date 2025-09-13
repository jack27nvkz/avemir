const userService = require( "../services/userService" );
const { validationResult } = require( "express-validator" );
const ApiError = require( "../exceptions/apiError" );

class UserController{
    async registration( req, res, next ){
        try{
            const errors = validationResult( req );

            if( !errors.isEmpty() ){
                next( ApiError.badRequest( "Логин или пароль не соответствует требованиям", errors.array() ) );
            }

            const { email, password } = req.body;
            const userData = await userService.registration( email, password );

            res.cookie( "refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } );

            return res.json( userData );
        }catch( error ){
            next( error );
        }
    }

    async login( req, res, next ){
        try{
            const { email, password } = req.body;
            const userData = await userService.login( email, password );

            res.cookie( "refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } );

            return res.json( userData );
        }catch( error ){
            next( error );
        }
    }

    async logout( req, res, next ){
        try{
            const { refreshToken } = req.cookies;
            const deletedCount = await userService.logout( refreshToken );

            res.clearCookie( "refreshToken" );
            
            return res.json({ 
                message: "Logout is success!",
                deletedCount 
            });

        }catch( error ){
            next( error );
        }
    }

    async activation( req, res, next ){
        try{
            const activationLink = req.params.link;
            await userService.activation( activationLink );
            return res.redirect( process.env.CLIENT_URL );
        }catch( error ){
            next( error );
        }
    }

    async refresh( req, res, next ){
        try{
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh( refreshToken ); 
            res.cookie( "refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } );

            return res.json( userData );

        }catch( error ){
            next( error );
        }
    }
}

module.exports = new UserController();