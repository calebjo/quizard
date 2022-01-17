const express = require("express");
const router = express.Router({ mergeParams: true });
const validateQuestionInput = require('../../validation/questions');

const Question = require('../../models/Question');
const QuestionSet = require('../../models/QuestionSet');

// 
// UNDER CONSTRUCTION
// 

// // Index route; grabs all questions in set
// router.get('/question_sets/:question_set_id/', (req, res) => {
//     // filters by set id key
//     const filter = { question_set_id: req.params.question_set_id } 

//     Question.find(filter)
//         .then(questions => res.json(questions))
//         .catch(err => res.status(404).json({ noSetFound: "No set found "}))
// })

// Route to retrieve individual questions
router.get('/:id', (req, res) => {
    // filters by question id
    const filter = { _id: req.params.id };
    
    Question.findOne(filter)
        .then(question => {
            if (question) {
                return res.json(question)
            } else {
                return res.json({ error: "Question not found" }).status(404)
            }
        })
        .catch(() => res.status(404).json({ error: "Question not found" }))
})

// Route creates questions (posts to '/api/questions')
router.post('/', (req, res) => {
    // validates question information
    const { errors, isValid } = validateQuestionInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const set_id = req.body.set_id;
    const category = req.body.category;
    const question = req.body.question;
    const correctAnswer = req.body.correctAnswer;
    const incorrectAnswers = req.body.incorrectAnswers;
    const type = req.body.type;

    const newQuestion = new Question({
        set_id,
        category,
        question,
        correctAnswer,
        incorrectAnswers,
        type
    });

    // saves the question on its own
    newQuestion.save()
        .then(question => {

            // updates the corresponding set using previously stored questionId
            QuestionSet.findByIdAndUpdate(
                { _id: set_id }, 
                { $push: { questions: question._id } },
                { new: true }
            ).then(() => { })

            return res.json(question).status(200);
        })
        .catch(err => res.json(err))
});

// Update route, returns question after udpate
router.patch('/:id', (req, res) => {

    // validates updates
    const { errors, isValid } = validateQuestionInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const set_id = req.body.set_id;
    const category = req.body.category;
    const question = req.body.question;
    const correctAnswer = req.body.correctAnswer;
    const incorrectAnswers = req.body.incorrectAnswers;
    const type = req.body.type;

    const filter = { _id: req.params.id };
    const updateParams = { 
        set_id,
        category,
        question, 
        correctAnswer, 
        incorrectAnswers, 
        type
    }

    Question.findOneAndUpdate(filter, updateParams, { new: true })
        .then(question => res.json(question)).status(200)
        .catch(() => res.json({ error: "Question not found" }).status(404))
});

// Delete route, returns question after removal 
router.delete('/:id', (req, res) => {
    const filter = { _id: req.params.id };
    Question.findOneAndRemove(filter)
        .then(question => {
            
            // removes the question id from its parent question set
            // QuestionSet.findByIdAndUpdate(
            //     { _id: set_id },
            //     { $pull: { questions: question._id } },
            //     { new: true }
            // ).then(() => {}).catch(() => {})
            
            return res.status(200).json(question)
        })
        .catch(() => res.status(404).json({ error: "Question not found" }))
});

module.exports = router;