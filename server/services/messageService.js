const { Message, User } = require( "../models/models" );

class MessageService{
    async sendMessage( roomId, senderId, text, contentType = "text" ){
        const message = await Message.create({
            roomId,
            senderId,
            text,
            contentType,
        });

        return message;
    }

    async getMessages( roomId, limit, offset = 0 ){
        limit = Math.min( limit, 100 );
        
        const messages = await Message.findAll({
            where: { roomId, isDeleted: false },
            include: [{
                model: User,
                as: "Sender",
                attributes: [ "id", "nickname" ],
            }],
            order: [[ "createdAt", "ASC" ]],
            limit, 
            offset
        });

        return messages;
    }

    async deleteMessage( messageId, userId ){
        const message = await Message.findOne({ where: { id: messageId }});
        if( !message) {
            throw new Error( "Сообщение не найдено" );
        }

        if( message.senderId !== userId ){
            throw new Error( "Нельзя удалить чужое сообщение" );
        }

        await message.update({ isDeleted: true });

        return message;
    }
}

module.exports = new MessageService();