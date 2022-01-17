const express = require("express");
const router = express.Router();

const validateQuizSet = require('../../validation/quiz_sets');
const QuizSet = require('../../models/QuizSet');

module.exports = router;