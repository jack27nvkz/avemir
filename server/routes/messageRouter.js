const Router = require( "express" );
const router = new Router();
const authMiddleware = require( "../middlewares/authMiddleware" );
const accessRoomMiddleware = require( "../middlewares/accessRoomMiddleware" );
const messageController = require( "../controllers/messageController" );

router.use( authMiddleware );
router.use( accessRoomMiddleware );

router.post( "/", messageController.sendMessage );
router.get( "/", messageController.getMessages );
router.delete( "/:id", messageController.deleteMessage );

module.exports = router;