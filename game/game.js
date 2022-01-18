class Game {
    constructor(questions, players) {
        this.rounds = questions.length;
        this.questions = questions;
        this.players = players;
        this.activePlayers = players;
        this.inactivePlayers = [];

        this.incorrectAnswersHelper = this.incorrectAnswersHelper.bind(this);
    }

    static normalizeQuestions(questions) {
        // questions should be an array of question objects
        // Each question object should contain { question, incorrectAnswers, correctAnswer, category }
        let normalizedQuestions = [];
        questions.forEach(question => {
            const _normalizedQuestion = {};
            _normalizedQuestion['correctAnswer'] = question.correctAnswer;
            if (question.incorrectAnswers.length < 4) {
                _normalizedQuestion['incorrectAnswers'] = question.incorrectAnswers;
            } else {
                _normalizedQuestion['incorrectAnswers'] = incorrectAnswersHelper(question.incorrectAnswers)
            }
            normalizedQuestions.push(_normalizedQuestion);
        })
    }

    incorrectAnswersHelper(answersArray) {
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
}