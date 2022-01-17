const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        require: true, 
        unique: true
    },
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
        type: Schema.Types.ObjectId,
        ref: "Set"
    }],
    games_played: {
        type: Number, 
        default: 0
    },
    games_won: {
        type: Number,
        default: 0
    }},
    { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema)