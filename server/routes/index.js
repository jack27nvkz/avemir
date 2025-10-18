const Router = require( "express" );
const router = new Router();
const userRouter = require( "./userRouter" );
const contactRouter = require( "./contactRouter" );
const roomRouter = require( "./roomRouter" );
const messageRouter = require( "./messageRouter" );

router.use( "/user", userRouter );
router.use( "/contacts", contactRouter );
router.use( "/rooms", roomRouter );
router.use( "/messages", messageRouter );

module.exports = router;