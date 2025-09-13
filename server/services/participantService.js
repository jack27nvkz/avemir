const participantModel = require( "../models/models" ).Participant;

class ParticipantService{
    async addParticipant( roomId, userId, role = "member" ){
        const participant = await participantModel.create({
            roomId,
            userId,
            role
        });

        return participant;
    }
}

module.exports = new ParticipantService();