const sequelize = require( "../db" );
const { DataTypes } = require( "sequelize" );

const User = sequelize.define( "user", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true }},
    password: { type: DataTypes.STRING, allowNull: false },
    activationLink: { type: DataTypes.STRING, allowNull: true },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    username: { type: DataTypes.STRING, allowNull: false },
    inviteCode: { type: DataTypes.STRING, allowNull: false, unique: true }
},{
    tableName: "users",
    timestamps: true
});

const Token = sequelize.define( "token", {
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
    refreshToken: { type: DataTypes.TEXT, allowNull: false }
},{
    tableName: "tokens",
    timestamps: true
});

const Contact = sequelize.define( "contact", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
    contactUserId: { type: DataTypes.INTEGER, references: { model: "users", key: "id" }},
    contactName: { type: DataTypes.STRING, allowNull: false }
},{
    tableName: "contacts",
    timestamps: true,
    indexes: [
        { fields: [ "userId", "contactUserId" ], unique: true }
    ]
});

const Room = sequelize.define( "room", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM( "private", "group" ), defaultValue: "private", allowNull: false },
}, {
    tableName: 'rooms',
    timestamps: true
});

const Participant = sequelize.define( "participant", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
    roomId: { type: DataTypes.INTEGER, references: { model: "rooms", key: "id" }, onDelete: "CASCADE" },
    role: { type: DataTypes.ENUM( "admin", "member" ), defaultValue: "member" },
    isHidden: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    tableName: 'participants',
    timestamps: true
});

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomId: { type: DataTypes.INTEGER, references: { model: 'rooms', key: 'id' } },
    senderId: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: "SET NULL" },
    text: { type: DataTypes.TEXT, allowNull: true },
    contentType: { type: DataTypes.ENUM( "text", "img", "file", "voice" )},
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'messages',
    timestamps: true,
    indexes: [
      { fields: ['roomId', 'createdAt'] }, 
      { fields: ['senderId'] }
    ],
});

User.hasOne( Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo( User, { foreignKey: 'userId' });

User.hasMany( Contact, { foreignKey: 'userId', as: 'Contacts' });
Contact.belongsTo( User, { foreignKey: 'userId', as: 'Owner' });

User.hasMany( Contact, { foreignKey: 'contactUserId', as: 'InContactsOf' });
Contact.belongsTo( User, { foreignKey: 'contactUserId', as: 'ContactUser' });

User.hasMany( Participant, { foreignKey: 'userId' });
Participant.belongsTo( User, { foreignKey: 'userId', as: 'User' });

Room.hasMany( Participant, { foreignKey: 'roomId' });
Participant.belongsTo( Room, { foreignKey: 'roomId', as: 'Room' });

Room.hasMany( Message, { foreignKey: 'roomId' });
Message.belongsTo( Room, { foreignKey: 'roomId' });

User.hasMany( Message, { foreignKey: 'userId' });
Message.belongsTo( User, { foreignKey: 'userId', as: 'Sender' });

module.exports = {
    User, 
    Token, 
    Contact,
    Room, 
    Participant,
    Message
};
