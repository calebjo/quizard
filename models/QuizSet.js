const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSetSchema = new Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }]},
    { timestamps: true },
    { minimize: false }
);

module.exports = Set = mongoose.model("QuizSet", QuizSetSchema)