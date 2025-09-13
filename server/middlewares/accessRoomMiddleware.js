const ApiError = require( "../exceptions/apiError" );
const Participant = require( "../models/models" ).Participant;

module.exports = ( options = {} ) =>{
    const { param = "roomId", body = false } = options;
        return async ( req, res, next ) => {
        try {
            const roomId = body ? req.body[ param ] : req.params[ param ];
            if( !roomId ){
                next( ApiError.badRequest( "Не указан roomId" ));
            }

            const userId = req.user.id;
            const participant = await Participant.findOne({ 
                where: { userId, roomId }
            });

            if( !participant ){
                return next( ApiError.accessError( "Нет доступа к комнате" ));
            }

            req.roomId = roomId;
        } catch (error) {
            next( ApiError.accessError( "Нет доступа к комнате" ) );
        }
    }
}