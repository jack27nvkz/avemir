module.exports = class UserDto{
    id;
    email;
    isActivated;
    inviteCode;
    username;

    constructor( model ){
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.inviteCode = model.inviteCode;
        this.username = model.username;
    }
}