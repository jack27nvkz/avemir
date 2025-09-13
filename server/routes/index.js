const Router = require( "express" );
const router = new Router();
const userRouter = require( "./userRouter" );
const contactRouter = require( "./contactRouter" );
const roomRouter = require( "./roomRouter" );

router.use( "/user", userRouter );
router.use( "/contacts", contactRouter );
router.use( "/rooms", roomRouter );

module.exports = router;