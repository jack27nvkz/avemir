const contactModel = require( "../models/models" ).Contact;
const userModel = require( "../models/models").User;
const ApiError = require( "../exceptions/apiError" );

class ContactService{
    async addContact( inviteCode, userId ){
        const candidate = await userModel.findOne({ where: { inviteCode } });
        if( !candidate ){
            throw ApiError.badRequest( `Пользователя с таким кодом не существует`, 404 );
        }
    
        const contactUserId = candidate.id;

        if (userId === contactUserId) {
            throw ApiError.badRequest( "Нельзя добавить себя в контакты" );
        }
      
        const existing = await contactModel.findOne({ where: {
            userId,
            contactUserId
        }});

        if( existing ){
            throw ApiError.badRequest( `Контакт уже добавлен` );
        }

        const contact = await contactModel.create({
            userId,
            contactUserId,
            contactName: candidate.username
        });
  
        return contact;
    }

    async getContacts( userId ){
        const contacts = await contactModel.findAll({ 
            where: { userId },
            include: [
                {
                    model: userModel,
                    as: "ContactUser",
                    attributes: ['id', 'username', 'email'],
                }
            ]
        });

        return contacts;
    }

    async deleteContact( id ){
        const contact = await contactModel.destroy({
            where: { id }
        });

        return contact;
    }
}

module.exports = new ContactService();