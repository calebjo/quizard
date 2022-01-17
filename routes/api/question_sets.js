const express = require("express");
const router = express.Router();
const validateQuestionSet = require('../../validation/question_sets');

const QuestionSet = require('../../models/QuestionSet');
const Question = require('../../models/Question');


router.get('/:id'), (req, res) => {
    QuestionSet.findById(req.params.id)
        .then(set => res.json(set).status(200))
        .catch(err => res.status(404).json({ error: "Question Set could not be found"})
    )
}

// Route creates new sets
router.post('/', (req, res) => {
    // validates QSet information
    const { errors, isValid } = validateQuestionSet(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const creator_id = req.body.creator_id;
    const category = req.body.category;
    const title = req.body.title;
    const description = req.body.description;

    const newSet = new QuestionSet({
        creator_id,
        category,
        title,
        description
    });

    newSet.save()
        .then(q_set => res.json(q_set))
        .catch(err => res.json(err))
});

// Updates QSet -- should be used as part of the create page on the front end
// Set should be created, and then populated with questions
router.patch('/:id', (req, res) => {

    // validates updates
    const { errors, isValid } = validateQuestionInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const category = req.body.category;
    const questions = req.body.questions;
    const title = req.body.title;
    const description = req.body.description;

    const filter = { _id: req.params.id };
    const update = { 
        category, 
        questions, 
        title, 
        description
    }

    if (questions.length === 0) {
        return res.status(403).json({ error: "At least 3 Questions required"})
    }

    QuestionSet.findOneAndUpdate(filter, update, { new: true })
        .then(question => res.json(question)).status(200)
        .catch(() => res.json({ error: "Question Set not found" }).status(404))
});

// Delete route, returns question after removal 
router.delete('/:id', (req, res) => {
    // deletes Question Set
    const QSetfilter = { _id: req.params.id };
    QuestionSet.findOneAndRemove(QSetfilter)
        .then(question => res.status(200).json(question))
        .catch(() => res.status(404).json({ error: "Question Set not found" }))

    // delets all Questions associated with the set
    const Qfilter = { set_id: req.params.id } 
    Question.deleteMany(Qfilter)
        .then(question => res.status(200).json(question))
        .catch(() => res.status(404).json({ error: "Questions not found" }))
});

module.exports = router;