require( "dotenv" ).config();
const express = require( "express" );
const cors = require( "cors" );
const cookieParser = require( "cookie-parser" );
const sequelize = require( "./db" );
const router = require( "./routes/index" );
const app = express();
const PORT = process.env.PORT || 5000;
const errorMiddleware = require( "./middlewares/errorMiddleware" );

app.use( express.json() );
app.use( cookieParser() );
app.use( cors() ); 
app.use( "/api", router );
app.use( errorMiddleware );

const server = require( "http" ).createServer( app );
const { Server } = require( "socket.io" );
const ioHandler = require( "./sockets/index" );;

const io = new Server( server, {
    cors: {
        origin: "http://localhost:5000",
        credentials: true
    }
});

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        
        app.set( "io", io );
        ioHandler( io );

        server.listen( PORT, () => { console.log( `Server started on port ${ PORT }` )});
    }catch( error ){
        console.log( error );
    }
}

start();