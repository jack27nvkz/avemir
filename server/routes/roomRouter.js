const Router = require( "express" );
const router = new Router();
const authMiddleware = require( "../middlewares/authMiddleware" );
const roomController = require( "../controllers/roomController" );

router.use( authMiddleware );

router.post( "/", roomController.getRoom );

module.exports = router;