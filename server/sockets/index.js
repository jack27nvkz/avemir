const wsAccessMiddleware = require( "../middlewares/wsAccessMiddleware" );
const wsService = require( "../services/wsService" );
const callService = require( "../services/callService" );
const socketHandler = require( "./socketHandler" );
const { Participant } = require( "../models/models" );

module.exports = ( io ) => {
    wsService.init( io );
    callService.init( io );
    io.use( wsAccessMiddleware );

    io.on('connection', async ( socket ) => {
        console.log( 'connect', socket.id, 'as user', socket.userId );

        const userId = socket.userId;
        
        try {
            const userRooms = await Participant.findAll({
                where: { userId },
                attributes: [ 'roomId' ]
            });
            
            userRooms.forEach( ({ roomId }) => {
                socket.join( `room-${ roomId }` );
            });
            
            console.log( `Пользователь ${ userId } присоединён к ${ userRooms.length } чатам` );
        } catch ( error ) {
            console.log( "Ошибка подключения", error );
            socket.disconnect();
        }
        
        socket.join( `user-${ socket.userId }` );
        socketHandler( socket );
    });
}