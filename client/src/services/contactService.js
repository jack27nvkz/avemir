import api from "../http/index";

export default class ContactService {
    static async getContacts() {
        return api.get( `/contacts` );
    }

    static async addContact( inviteCode ) { 
        return api.post( `/contacts`, { inviteCode } );
    }

    static async deleteContact( id ) {
        return api.delete( `/contacts/${ id }` );
    }
}