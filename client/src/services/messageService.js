import api from "../http/index";

export default class MessageService {
    static async getMessages( roomId, limit = 20, offset = 0 ) {
        return api.get( `/messages/${ roomId }?limit=${ limit }&offset=${ offset }` );
    }
    
    static async sendMessage( roomId, text ) {
        return api.post( `/messages`, { roomId, text } );
    }
}