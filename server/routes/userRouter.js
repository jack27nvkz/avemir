const Router = require( "express" );
const router = new Router();
const userController = require( "../controllers/userController" );
const { body } = require( "express-validator" );

router.post( 
    "/registration", 
    body( "email" ).isEmail(), 
    body( "password" ).isLength({ min: 4, max: 16 }),
    userController.registration );
router.post( "/login", userController.login );
router.post( "/logout", userController.logout );
router.get( "/activation/:link", userController.activation );
router.get( "/refresh", userController.refresh );

module.exports = router;
