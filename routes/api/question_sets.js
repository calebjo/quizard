const express = require("express");
const router = express.Router();

const validateQuestionSet = require('../../validation/question_sets');
const QuestionSet = require('../../models/QuizSet');

module.exports = router;