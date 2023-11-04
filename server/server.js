
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cors = require('cors'); // Import the cors package
const router = express.Router();


const playerscraperRoute = require('./routes/playerScraper'); 
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const readplayersRoute = require('./routes/readPlayers');
const readmatchesRoute = require('./routes/readMatches');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/playerScraper", playerscraperRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/readPlayers", readplayersRoute);
app.use("/readMatches", readmatchesRoute);


//routes.initialize(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "running successfully"
    };
    res.send(status);
});


//module.exports = router;