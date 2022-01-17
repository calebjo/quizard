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
    title: {
        type: String, 
        required: true
    },
    description: String
    },
    { timestamps: true },
    { minimize: false }
);

module.exports = QuestionSet = mongoose.model("QuestionSet", QuestionSetSchema)