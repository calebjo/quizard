const express = require("express");
const app = express();
// additional reqs:
// mongoose
// db
// bodyParser
// passport

// mongoose connection here

app.get("/", (req, res) => 
    res.send("Hello World!")
)

// app routes here

// passport here
// bodyparser here

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))