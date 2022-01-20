const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LobbySchema = new Schema({
    creator_id: {
        type: String,
        required: true
    },
    room_id:  {
        type: String,
        required: true
    },
    set_id: {
        type: Schema.Types.ObjectId,
        ref: "QuestionSet"
    },
    players: Array
    },
    { timestamps: true }
);

module.exports = Lobby = mongoose.model("Lobby", LobbySchema);