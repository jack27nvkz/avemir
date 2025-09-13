const jwt = require( "jsonwebtoken" );
const tokenModel = require( "../models/models" ).Token;

class TokenService {
    generateTokens( payload ){
        const accessToken = jwt.sign( payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign( payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken( accessToken ){
        try {
            const userData = jwt.verify( accessToken, process.env.JWT_ACCESS_SECRET );
            return userData;
        } catch ( error ) {
            return null;
        }
    }


    validateRefreshToken( refreshToken ){
        try {
            const userData = jwt.verify( refreshToken, process.env.JWT_REFRESH_SECRET );
            return userData;
        } catch ( error ) {
            return null;
        }
    }

    async saveToken( userId, refreshToken ){
        const tokenData = await tokenModel.findOne({ where: { userId } });
       
        if( tokenData ){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ userId, refreshToken });
        return token;
    }

    async removeToken( refreshToken ){
        const deletedCount = await tokenModel.destroy({ where: { refreshToken }});
        return deletedCount;
    }

    async findToken( refreshToken ){
        const tokenData = await tokenModel.findOne({ where: { refreshToken }});
        return tokenData;
    }   
}

module.exports = new TokenService();