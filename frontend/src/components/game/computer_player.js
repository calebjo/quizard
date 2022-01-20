export default class ComputerPlayer {
    constructor(player, mode) {
        // For the QuizBot, the player object should consist of a randomly generated id as well as a username
        // e.g. { id: 'id', username: 'username' }
        const { id, username } = player;
        this.id = id;
        this.username = username;
        
        // mode can be 'hard', 'medium', 'easy'
        let coefficiant; 
        switch(mode) {
            case ('hard'):
                coefficiant = 3;
                break;
            case('medium'):
                coefficiant = 1.5;
                break;
            case('easy'):
                coefficiant = 1;
                break;
        }
        // a quizCoefficiant of:
        // 3 (hard) guarantees that the computer will select the correct answer 75% of the time
        // 1.5 (medium) gurantees that the computer will select the correct answer 50% of the time
        // 1 (easy) gurantees that the computer will select the correct answer 25% of the time
        this.quizCoefficiant = coefficiant;
    }

    giveResponse(question, _responseString) {
        // response string can be omitted as the computer player will generate its answer from the question
        const { correctAnswer, incorrectAnswers } = question;
        const id = this.id;
        // answerChoiceConstraint is a value that determines whether the computer will select the correct answer 
        const correctAnswerThreshold = .75;
        const answerChoiceConstraint = Math.floor(Math.random() * this.quizCoefficiant)

        if (answerChoiceConstraint >= correctAnswerThreshold) {
            return { id: correctAnswer }
        } else {
            // multiply by 3 because there are 3 incorrect answers
            const answerIndex = Math.floor(Math.random() * 3);
            const answer = incorrectAnswers[answerIndex];
            return { id: answer }
        }
    }
}