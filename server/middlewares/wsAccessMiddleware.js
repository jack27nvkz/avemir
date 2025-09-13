const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const ApiError = require( "../exceptions/apiError" );

module.exports =  async ( socket, next ) => {
    const token = socket.handshake.auth.token;

    if ( !token ) {
      return next( ApiError.unauthorizedError() );
    }

    try {
      const decoded = jwt.verify( token, process.env.JWT_ACCESS_SECRET );
      const user = await User.findByPk( decoded.id );

      if ( !user ) {
        return next( ApiError.unauthorizedError() );
      }

      socket.userId = user.id; 
      socket.user = user;      
      next(); 
    } catch ( error ) {
      return next( ApiError.unauthorizedError() );
    }
};
