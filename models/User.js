const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    sets_created: [{
        type: Schema.Types.ObjectId
    }],
    games_played: {
        type: Number
    },
    games_won: {
        type: Number
    },
    timestamps: true,
});

module.exports = User = mongoose.model("User", UserSchema)