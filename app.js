const express = require("express");
const app = express();
// additional reqs:
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
// const quizSets = require("./routes/api/quiz_sets");
const questions = require("./routes/api/questions");
const gameRecords = require("./routes/api/game_records")

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
// app.use("/api/quiz_sets", quizSets);
app.use("/api/questions", questions);
app.use("/api/game_records", gameRecords);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`))