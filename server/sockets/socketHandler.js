const callService = require( "../services/callService" );

module.exports = ( socket ) => {
    socket.on( "call-offer", async ( data ) => {
        await callService.initiateCall( socket, data );
    });

    socket.on( "call-answer", ( data ) => {
        callService.answerCall( socket, data );
    });

    socket.on( "call-end", ( data ) => {
        callService.endCall( socket, data );
    });

    socket.on( "ice-candidate", ( data ) => {
        callService.handleIceCandidate( socket, data ); 
    });

    socket.on( 'typing', ({ roomId }) => {
        socket.to( `room-${ roomId }` ).emit( 'user-typing', {
            userId: socket.userId,
            roomId
        });
    });

    socket.on( 'stop-typing', ({ roomId }) => {
        socket.to( `room-${ roomId }` ).emit( 'user-stopped-typing', {
            userId: socket.userId
        });
    });

    socket.on( 'disconnect', () => {
        console.log( "disconnect", socket.userId );
    });
}