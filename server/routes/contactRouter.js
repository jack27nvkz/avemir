const Router = require( "express" );
const router = new Router();
const contactController = require( "../controllers/contactController" );
const authMiddleware = require( "../middlewares/authMiddleware" );

router.use( authMiddleware );

router.post( "/", contactController.addContact );
router.get( "/", contactController.getContacts );
router.delete( "/:id", contactController.deleteContact );

module.exports = router;