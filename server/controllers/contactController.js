const contactService = require( "../services/contactService" );
const ApiError = require( "../exceptions/apiError" );

class ContactController{
    async addContact( req, res, next ){
        try {
            const { inviteCode } = req.body;
            const userId = req.user.id;
            const contact = await contactService.addContact( inviteCode, userId );
            
            return res.json( contact );
        } catch ( error ) {
            next( error );
        }
    }

    async deleteContact( req, res, next ){
        try {
            const id = req.params.id;
            const deleteCount = await contactService.deleteContact( id );

            if( deleteCount === 0){
                next( 404, ApiError.badRequest( "Контакт не найден" ));
            }

            return res.json({ message: `Контакт с id ${ id } удален` });
        } catch ( error ) {
            next( error );
        }
    }

    async getContacts( req, res, next){
        try {
            const userId = req.user.id;
            const contacts = await contactService.getContacts( userId );

            return res.json( contacts );
        } catch ( error ) {
            next( error );
        }
    }
}

module.exports = new ContactController();