import HumanPlayer from "./human_player";
import ComputerPlayer from "./computer_player";

export default class Game {
    constructor(questions, players) {
        // questions should be an array of question objects
        // players should ONE object { _id: ['computer', 'username'], _id: ['human', 'username'], _id: ['human', 'username'] }
        this.totalRounds = questions.length;
        this.round = 0;
        this.questions = Game.normalizeQuestions(questions);
        this.players = Game.createPlayers(players);
        this.activePlayers = this.players;
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

    static createPlayers(players) {
        const playerIds = Object.keys(players)
        const playersObject = {};
        playerIds.forEach(id => {
            switch(players[id][0]) {
                case ('human'): 
                    playersObject[id] = new HumanPlayer({id: id, username: players[id][1]})
                case ('computer'): 
                    playersObject[id] = new ComputerPlayer({ id: id, username: players[id][1] })
            }
        })
        return playersObject
    }

    playRound(question) {
    // question should be a singular question object
    // responses should be an array of 'response objects'
    // e.g. [{ playerId: response }, { playerId: response }, { playerId: response }]
        const correctAnswer = question.correctAnswer;
        let removals = [];
        let playerResponses = [];

        let players = Object.values(this.players);
        players.forEach(player => {
            player.giveResponse(question)
        })

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


