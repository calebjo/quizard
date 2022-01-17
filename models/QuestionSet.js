const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSetSchema = new Schema({
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
    }],
    title: {
        type: String, 
        required: true
    },
    description: String
    },
    { timestamps: true },
    { minimize: false }
);

module.exports = Set = mongoose.model("QuestionSet", QuestionSetSchema)