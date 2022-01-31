const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserUpdate = require('../../validation/update_profile');
const User = require('../../models/User');

router.get('/:id', (req, res) => {
    // filters by question id
    const filter = { _id: req.params.id };

    User.findOne(filter)
        .then(user => {
            if (user) {
                return res.json(user)
            } else {
                return res.json({ error: "User not found" }).status(404)
            }
        })
        .catch(() => res.status(404).json({ error: "Question not found" }))
})

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;


    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "A user has already registered with this address" })
        } else {
            const newUser = new User({ email, username, password })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    // newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                    newUser.save().then(user => res.json(user)).catch();
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "This user does not exist." })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    } else {
                        res.status(400).json({ password: "Incorrect password." })
                    }
                })
        })
})

router.patch('/:id', (req, res) => {

    const { errors, isValid, isUpdatingPassword } = validateUserUpdate(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const filter = { _id: req.params.id };

    const username = req.body.username;
    const email = req.body.email;
    
    // Validator contains key to determine whether or not user intends to update their password
    if (isUpdatingPassword) {
        User.findOne(filter).then(user => { 
            const old_password = req.body.old_password
            if (!user) {
                return res.status(404).json({ email: "This user does not exist." })
            }
            bcrypt.compare(old_password, user.password).then(isMatch => {
                if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => { 
                            if (err) throw err;

                            // in order to have access to the hash, update the users info within the callback function
                            const updateParams = {
                                username,
                                email,
                                password: hash,
                            };

                            User.findOneAndUpdate(filter, updateParams, { new: true })
                                .then(user => res.json(user).status(200))
                                .catch(() => res.json({ error: "This user does not exist" }))
                        })   
                    })
                } else {
                    return res.status(404).json({ password: "Incorrect password" })
                }})})
    } else {
        // if the user is not updating their password, ignore password in update query
        const updateParams = {
            username,
            email
        }

        User.findOneAndUpdate(filter, updateParams, { new: true })
            .then(user => res.json(user).status(200))
            .catch(() => res.json({ error: "This user does not exist" })
        )
    }
});

router.delete('/:id', (req, res) => {
    const filter = { _id: req.params.id };
    User.findByIdAndRemove(filter)
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json({ error: "This user does not exist"}))
    }
);

module.exports = router;