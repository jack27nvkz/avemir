const ApiError = require( "../exceptions/apiError" );
const roomService = require( "../services/roomService" );

class RoomController{
    async getRoom( req, res, next ){
        try {
            const userId = req.user.id;
            const { contactUserId } = req.body;
            const room = await roomService.getRoom( userId, contactUserId );
            
            return res.json( room );
        } catch ( error ) {
            next( ApiError.serverSideError( "Ошибка создания комнаты" ));
        }
    }
}

module.exports = new RoomController();