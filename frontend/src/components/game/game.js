// const { response, response } = require("express");

export default class Game {
    constructor(questions, players) {
        // questions should be an array of question objects
        // players should ONE OBJECT { _id: username, _id: username, _id: username }
        this.totalRounds = questions.length;
        this.round = 0;
        this.questions = Game.normalizeQuestions(questions);
        this.activePlayers = players;
        this.inactivePlayers = {};
        this.incorrectAnswersHelper = this.incorrectAnswersHelper.bind(this);
        this.normalizeQuestions = this.normalizeQuestions.bind(this);
        this.playRound = this.playRound.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    static normalizeQuestions(questions) {
        // Each question object should contain { question, incorrectAnswers, correctAnswer, category, type }
        let normalizedQuestions = [];
        questions.forEach(question => {
            let _normalizedQuestion = {};
            _normalizedQuestion['correctAnswer'] = question.correctAnswer;
            if (question.incorrectAnswers.length < 4) {
                _normalizedQuestion['incorrectAnswers'] = question.incorrectAnswers;
            } else {
                _normalizedQuestion['incorrectAnswers'] = this.incorrectAnswersHelper(question.incorrectAnswers)
            }
            normalizedQuestions.push(_normalizedQuestion);
        })
        return normalizedQuestions
    }

    incorrectAnswersHelper(answersArray) {
        // In the event a question has more than 3 incorrect answers this function randomly selects 3
        let newAnswersArray = [];
        let indexStore = [];
        const totalOptions = answersArray.length;

        for (let i = 0; i < 3; i++) {
            let index = Math.floor(Math.random() * totalOptions);
            while (indexStore.includes(index)) {
                index = Math.floor(Math.random() * totalOptions);
            }
            indexStore.push(index);
            newAnswersArray.push(answersArray[index]);
        }

        return newAnswersArray;
    }

    playRound(question, playerResponses) {
    // question should be a singular question object
    // responses should be an array of 'response objects'
    // e.g. [{ playerId: response }, { playerId: response }, { playerId: response }]
        const correctAnswer = question.correctAnswer;
        let removals = [];

        playerResponses.forEach(responseObj => {
            const player = Object.keys(responseObj)[0];
            const response = Object.values(responseObj)[0];
            if (response !== correctAnswer) {
                removals.push(player);
            }
        })

        if (removals.length > 0) {
            removals.forEach(player => {
                this.inactivePlayers[player] = this.activePlayers[player];
                delete this.activePlayers[player];
            })
        }

        this.round++;
        return true;
    }

    gameOver() {
        let result; 
        this.round === this.totalRounds ? result = true : result = false;
        return result;
    }
}


