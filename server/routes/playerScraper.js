
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios'); // Import the axios library


const app = express();

router.get('/', async (req, res) => {
    // Initialize an array to store scraped data
    const scrapedData = [];
    console.log("hi")
    
    // Define the scraping logic
    for (let a = 1000; a < 1002; a++) {
        const url = `https://www.premierleague.com/players/${a}/players/stats`;

        try {
            const response = await axios.get(url);
            console.log(response)
            const html = response.data;
            const $ = cheerio.load(html);

            if ($('.allStatContainer.stattotal_pass').text().trim().split("\n")[0] !== '0' && $('.sideWidget.playerIntro').text().trim().split("Position")[1]) {
                const playerData = {
                    name: $('.playerDetails').find('.name').text(),
                    position: $('.sideWidget.playerIntro').text().trim().split("Position")[1],
                    goals: $('.allStatContainer.statgoals').text().trim().split("\n")[0],
                    shooting_accuracy: $('.allStatContainer.statshot_accuracy').text().trim().split("\n")[0],
                    heading_goals: $('.allStatContainer.statgoals').text().trim().split("\n")[0],
                    big_chances_miss: $('.allStatContainer.statbig_chance_missed').text().trim().split("\n")[0],
                    error_to_goal: $('.allStatContainer.staterror_lead_to_goal').text().trim().split("\n")[0],
                    interceptions: $('.allStatContainer.statinterception').text().trim().split("\n")[0],
                    blocked_shots: $('.allStatContainer.statblocked_scoring_att').text().trim().split("\n")[0],
                    big_chance_created: $('.allStatContainer.statbig_chance_created').text().trim().split("\n")[0],
                    assists: $('.allStatContainer.statgoal_assist').text().trim().split("\n")[0],
                    tackle_success: $('.allStatContainer.stattackle_success').text().trim().split("\n")[0],
                    duel_won: $('.allStatContainer.statduel_won').text().trim().split("\n")[0],
                    aerial_battle_won: $('.allStatContainer.stataerial_won').text().trim().split("\n")[0],
                    accurate_long_balls: $('.allStatContainer.stataccurate_long_balls').text().trim().split("\n")[0],
                    playerPhoto: $('.player-card-image img').attr('src')
                };
                console.log(playerData.name)
                scrapedData.push(playerData);
               
                
            }
        } catch (error) {
            console.error('Error retrieving results:', error.message);
        }
    }
   
    res.json(scrapedData);
    console.log('Data sent successfully');
});

module.exports = router;
