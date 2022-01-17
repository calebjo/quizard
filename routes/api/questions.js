const express = require("express");
const router = express.Router();
const validateQuestionInput = require('../../validation/questions');
const Question = require('../../models/Question');

router.get('/quiz_sets/:quiz_set_id', (req, res) => {
    Question.find({ quiz_set_id: req.params.quiz_set_id })
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ nosetfound: "No set found "}))
})

router.post('/', (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const category = req.body.category;
    const question = req.body.question;
    const correctAnswer = req.body.correctAnswer;
    const incorrectAnswers = req.body.incorrectAnswers;
    const type = req.body.type;

    const newQuestion = new Question({
        category,
        question,
        correctAnswer,
        incorrectAnswers,
        type
    });

    newQuestion.save()
        .then(question => res.json(question))
        .catch(err => console.log(err))
});

// router.patch('/questions/:id', (req, res) => {
//     Question.findById(req.params.id).then(q => )
// })

router.delete('/:id', (req, res) => {
    Question.deleteOne({ _id: req.params.id }).then(() => res.status(204).send()).catch(err => res.status(404)).json({ error: "Question not found "})
})

module.exports = router;