

export default class Game {
    constructor(players) {
        // questions should be an array of question objects
        // players should ONE object { computerId: ['computer', 'username'], socketId: ['human', 'username', db_id (if they have one], socketId: ['human', 'username'] }
    
        this.players = Game.createPlayers(players);
        this.activePlayers = this.players;
        this.inactivePlayers = {};
        
        // this.incorrectAnswersHelper = this.incorrectAnswersHelper.bind(this);
        // this.playRound = this.playRound.bind(this);
        // this.gameOver = this.gameOver.bind(this);
    }

}


