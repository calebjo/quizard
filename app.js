const express = require("express");
const app = express();

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const questionSets = require("./routes/api/question_sets");
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

app.use("/api/users/", users);
app.use("/api/question_sets/", questionSets);
app.use("/api/questions/", questions);
app.use("/api/game_records/", gameRecords);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`))


// const art = require('./trivia_seeds/art');
// const film = require('./trivia_seeds/film');
// const food = require('./trivia_seeds/food');
// const geography = require('./trivia_seeds/geography');
// const gnk = require('./trivia_seeds/gnk');
// const history = require('./trivia_seeds/history');
// const music = require('./trivia_seeds/music');
// const science = require('./trivia_seeds/science');
// const society = require('./trivia_seeds/society');
// const sport = require('./trivia_seeds/sport');

// const Question = require('./models/Question');

// Question.insertMany(art);
// Question.insertMany(film);
// Question.insertMany(food);
// Question.insertMany(art);
// Question.insertMany(geography);
// Question.insertMany(gnk);
// Question.insertMany(history);
// Question.insertMany(music);
// Question.insertMany(science);
// Question.insertMany(society);
// Question.insertMany(sport);