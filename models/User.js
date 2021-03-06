const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
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