export default class HumanPlayer {
    constructor(player, _mode) {
        // player creation format --> { id: 'id', username: 'username' }
        const { id, username } = player;
        this.id = id;
        this.username = username;
    }

    giveResponse(_question, _responseString) {
        // null can be passed in for the question, this will only be necessary for the computer player;
        return { id: responseString };
    }
}