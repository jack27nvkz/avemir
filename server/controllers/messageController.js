const messageService = require( "../services/messageService" );
const wsService = require( "../services/wsService" );

class MessageController{
    async sendMessage( req, res, next ){
        try {
            const roomId = req.roomId;
            const { text, contentType } = req.body;
            const senderId = req.user.id;
            const message = await messageService.sendMessage( roomId, senderId, text, contentType );

            wsService.emitToRoom( roomId, "new-message", text );

            return res.json( message );
        } catch ( error ) {
            next( error );
        }
    }

    async getMessages( req, res, next ){
        try {
            const roomId = req.roomId;
            const messages = await messageService.getMessages( roomId, +req.query.limit, +req.query.offset );

            return res.json( messages );
        } catch ( error ) {
            next( error );
        }
    }

    async deleteMessage( req, res, next){
        try {
            const { messageId } = req.body;
            const userId = req.user.id;
            const message = await messageService.deleteMessage( messageId, userId );

            return res.json( message );
        } catch ( error ) {
            next( error )
        }
    }
}

module.exports = new MessageController();