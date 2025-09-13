const roomModel = require( "../models/models" ).Room;
const participantService = require( "../services/participantService" );
const participantModel = require( "../models/models" ).Participant;
const { Op } = require( "sequelize" );

class RoomService{
    async getRoom( userId, contactUserId ){
        const rooms = await roomModel.findAll({
            where: { type: 'private' },
            include: [{
                model: participantModel,
                attributes: ['userId'],
                where: {
                    userId: { [ Op.in ]: [ userId, contactUserId ] },
                },
            }]
        });

        const existingRoom = rooms.find(( room ) => {
            const participantIds = room.participants.map(( p ) => p.userId );
            return (
                participantIds.includes( userId ) &&
                participantIds.includes( +contactUserId ) &&
                participantIds.length === 2
            );
        });

        if( existingRoom ){
            return existingRoom;
        }

        const room = await roomModel.create({ type: "private" });

        await participantService.addParticipant( room.id, userId, "member" );
        await participantService.addParticipant( room.id, contactUserId, "member" );

        return room;
    }
}

module.exports = new RoomService();