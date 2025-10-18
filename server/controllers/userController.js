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

            //res.cookie( "refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } );

            //return res.json( userData );
            return res.json({ registerStatus: true });
        }catch( error ){
            next( error );
        }
    }

    async login( req, res, next ){
        try{
            const { email, password } = req.body;
            const userData = await userService.login( email, password );

            if( !userData.user.isActivated )
                return res.json({ activationStatus: false });
            
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
            const user = await userService.activation( activationLink );
            return res.redirect( `${ process.env.CLIENT_URL }/login?activation=success&email=${ user.email }` );
        }catch( error ){
            res.redirect( `${ process.env.CLIENT_URL }/login?activation=failed` );
            //next( error );
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
        // try {
        //     console.log('Refresh endpoint called');
        //     console.log('Cookies:', req.cookies);
        //     console.log('Headers:', req.headers);

        //     const { refreshToken } = req.cookies;

        //     if (!refreshToken) {
        //         console.log('No refresh token in cookies');
        //         return res.status(401).json({ message: 'No refresh token' });
        //     }

        //     console.log('Refresh token found:', refreshToken.substring(0, 10) + '...');

        //     const userData = await userService.refresh(refreshToken);

        //     res.cookie("refreshToken", userData.refreshToken, {
        //         maxAge: 30 * 24 * 60 * 60 * 1000,
        //         httpOnly: true
        //     });

        //     console.log('Refresh successful for user:', userData.user?.email);

        //     return res.json(userData);

        // } catch (error) {
        //     console.error('Refresh error:', error);
        //     next(error);
        // }

    }
}

module.exports = new UserController();