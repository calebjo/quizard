const express = require("express");
const router = express.Router();
const GameRecord = require("../../models/GameRecord");
const validateGameRecord = require("../../validation/game_record")

router.post('/', (req, res) => {
    const { errors, isValid } = validateGameRecord(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const winner = req.body.winner;
    const players = req.body.players;
    const category = req.body.category;

    const newGameRecord = new GameRecord({
        winner,
        players,
        category
    });

    newGameRecord.save()
        .then(game_record => res.json(game_record))
        .catch(err => res.json(err))
});

module.exports = router;