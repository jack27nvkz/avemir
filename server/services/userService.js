const userModel = require( "../models/models" ).User;
const bcrypt = require( "bcrypt" );
const uuid = require( "uuid" );
const mailService = require( "./mailService" );
const tokenService = require( "./tokenService" );
const contactService = require( "./contactService" );
const UserDto = require( "../dtos/userDto" );
const ApiError = require( "../exceptions/apiError" );

class UserService{
    async registration( email, password ){
        const candidate = await userModel.findOne({ where: { email } });
        
        if( candidate ){
            throw ApiError.badRequest( `Пользователь с почтой ${ email } уже существует` );
        }
        
        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash( password, 9 );
        const username = `user${ Date.now().toString().substring( 8 )}`;

        const inviteCode = (() => {
           const a = Math.floor(Math.random() * 900) + 100;
           const b = Math.floor(Math.random() * 900) + 100;
           return `${ a }-${ b }`;
        })();
        
        const user = await userModel.create({ 
            email, 
            password: hashPassword, 
            activationLink,
            username: username,
            inviteCode: inviteCode
         });
        
        const result = await mailService.sendActivationMail( email, `${ process.env.API_URL }/api/user/activation/${ activationLink }` );
        
        try{
            console.log( result );
        }catch( error ){
            console.log( error );
        }

        const userDto = new UserDto( user );
        const tokens = tokenService.generateTokens({ ...UserDto });
        
        await tokenService.saveToken( userDto.id, tokens.refreshToken );

        return { ...tokens, user: userDto };
    }   

    async activation( activationLink ){
        const user = await userModel.findOne({ where: { activationLink }});

        if( !user ){
            throw ApiError.badRequest( "Некорректная ссылка активации" );
        }

        user.isActivated = true;
        await user.save();
    }

    async login( email, password ){
        const user = await userModel.findOne({ where: { email } });
        
        if( !user ){
            throw ApiError.badRequest( `Пользователя с почтой ${ email } не существует` );
        }

        const isPasswordEqual = await bcrypt.compare( password, user.password );

        if( !isPasswordEqual ){
            throw ApiError.badRequest( `Неверный пароль` );
        }

        const userDto = new UserDto( user );
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken( userDto.id, tokens.refreshToken );

        return { ...tokens, user: userDto };
    }

    async logout( refreshToken ){
        const deletedCount = await tokenService.removeToken( refreshToken );
        return deletedCount;
    }

    async refresh( refreshToken ){
        if( !refreshToken ){
            throw new ApiError.unauthorizedError();
        }

        const userData = tokenService.validateRefreshToken( refreshToken );
        const tokenData = await tokenService.findToken( refreshToken );

        if( !userData || !tokenData ){
            throw new ApiError.unauthorizedError();
        }
        
        const user = await userModel.findOne({ where: { id: userData.id }});
        const userDto = new UserDto( user );
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken( userDto.id, tokens.refreshToken );

        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
