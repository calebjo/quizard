const express = require("express");
const router = express.Router();
const validateQuestionSet = require('../../validation/question_sets');

const QuestionSet = require('../../models/QuestionSet');
const Question = require('../../models/Question');
const User = require('../../models/User');

router.get('/:id', (req, res) => {
    const filter = { _id: req.params.id };

    QuestionSet.findOne(filter)
        .then(question => {
            if (question) {
                return res.json(question)
            } else {
                return res.json({ error: "Question Set not found" }).status(404)
            }
        })
        .catch(() => res.status(404).json({ error: "Question Set not found" }))
})

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
        .then(q_set =>res.json(q_set).status(200))
        .catch(err => res.json(err).status(404))
});

// Updates QSet -- should be used as part of the create page on the front end
// Set should be created, and then populated with questions
router.patch('/:id', (req, res) => {

    // validates updates
    const { errors, isValid } = validateQuestionSet(req.body);

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

    QuestionSet.findOneAndUpdate(filter, update, { new: true })
        .then(question => res.json(question).status(200))
        .catch(() => res.json({ error: "Question Set not found" }).status(404))
});

// Delete route, returns question after removal 
router.delete('/:id', (req, res) => {

    const qSetFilter = { _id: req.params.id };
    // deletes Question Set
    QuestionSet.findOneAndRemove(qSetFilter)
        .then(q_set => res.status(200).json(q_set))
        .catch(() => res.status(404).json({ error: "Question Set not found" })
    )
});

module.exports = router;