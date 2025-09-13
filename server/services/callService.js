const { Contact } = require( "../models/models" );

class CallService{
    constructor(){
        this.io = null;
        this.activeCalls = new Map();
    }
    init( io ){
        this.io = io;
        console.log( "IO init" );
    }

    async initiateCall( socket, data ){
        const { toUserId, roomId, type = "audio" } = data;
        const fromUserId = socket.userId;

        const canInitiateCall = await this.canInitiateCall( fromUserId, toUserId );

        if( canInitiateCall ){
            return socket.emit( "call-error", { message: "no access" });
        }

        const callId = this.generateCallId();

        this.activeCalls.set( callId, {
            callId,
            initiatorId: fromUserId,
            participantId: toUserId,
            roomId,
            type,
            status: "initiated"
        });

        this.io.to( `user-${ toUserId }` ).emit( "call-offer", {
            callId,
            from: fromUserId,
            offer: data.offer,
            type,
            roomId
        });

        socket.emit( "call-initiated", { callId, to: toUserId });
    }

    answerCall( socket, data ){
        const { callId, answer } = data;
        const call = this.activeCalls.get( callId );

        if( !call ){
            return socket.emit( "call-error", { message: "Call not found" });
        }

        call.status = "connected";

        this.io.to( `user-${ call.initiatorId }` ).emit( "call-answer", {
            callId,
            answer
        });
    }

    endCall( socket, data ){
        const { callId, reason = "ended" } = data;
        const call = this.activeCalls.get( callId );

        if( call ){
            const otherId = socket.userId === call.initiatorId ? call.participantId : call.initiatorId;
            this.io.to( `user-${ otherId }`).emit( "call-ended", { callId, reason });

            this.activeCalls.delete( callId );
        }
    }

    handleIceCandidate( socket, data ){
        const { callId, candidate, targetUserId } = data;

        this.io.to( `user-${ targetUserId }`).emit( "ice-candidate", {
            callId,
            candidate,
            fromUserId: socket.userId
        });
    }
    
    async canInitiateCall( userId, contactUserId ){
        const contact = await Contact.findOne({ 
            where: { 
                userId, 
                contactUserId 
            }
        });

        if( !contact ){
            return false;
        }

        return true;
    }

    generateCallId(){
        return `${ Date.now() }-${ Math.random().toString(36).substring(2, 9) }`;
    }

    getActiveCalls(){
        return Array.from( this.activeCalls.values() );
    }
}

module.exports = new CallService();