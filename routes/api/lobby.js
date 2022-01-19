// Grabs a particular room id 
router.get('/:id', (req, res) => {
    const filter = { room_id: req.params.id };
    Lobby.findOne(filter)
        .then(lobby => {
            if (lobby) {
                return res.json(lobby)
            } else {
                return res.json({ error: "Lobby not found" }).status(404)
            }
        })
        .catch(() => res.status(404).json({ error: "Lobby not found" }))
});

// Creates lobby, and returns the data
router.post('/', (req, res) => {
    // validates Lobby information
    const { errors, isValid } = validateLobby(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const creator_id = req.body.creator_id;
    const room_id = req.body.room_id;
    const set_id = req.body.set_id;

    const newLobby = new Lobby({
        creator_id,
        room_id,
        set_id
    });

    newLobby.save()
        .then(lobby => res.json(lobby).status(200))
        .catch(err => res.json(err).status(404))
});

// Delete route, returns lobby data after removal
router.delete('/:id', (req, res) => { 

    const filter = { room_id: req.params.id };

    Lobby.findOneAndRemove(filter)
        .then(lobby => res.json(lobby).status(200))
        .catch(() => res.json({ error: "Lobby not found "}).status(404))
});