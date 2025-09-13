class WSService{
    constructor(){
        this.io = null;
    }

    init( io ){
        this.io = io;
        console.log( "wss init" );
    }

    emitToRoom( roomId, event, data ){
        if( !this.io ){
            console.error( "Need to init io" );
            return;
        }

        this.io.to( `room-${ roomId }`).emit( event, data );
    }

    emitToUser( userId, event, data ){
        if( !this.io ) return;

        this.io.to( `user-${ userId }`).emit( event, data );
    }

    isUserOnline( userId ){
        if( !this.io ) return false;

        return this.io.sockets.adapter.rooms.has( `user-${ userId }` );
    }
}

module.exports = new WSService();