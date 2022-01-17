const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameRecordSchema = new Schema({
    winner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    category: {
        type: String,
        require: true
    }},
    {timestamps: true}
);

module.exports = GameRecord = mongoose.model("GameRecord", GameRecordSchema)