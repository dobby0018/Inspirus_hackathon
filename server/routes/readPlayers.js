const { google } = require('googleapis');
const csvParser = require('csv-parser');
const express = require('express');
const router = express.Router();


const { JWT } = require('google-auth-library');

const serviceAccountKey = {
    email: 'jason-313@readcsv-401302.iam.gserviceaccount.com',
    key: 'AIzaSyCcztwpGSazE5lyFJzRbU9bAECFRu3M6NA.json',
};

const auth = new JWT(serviceAccountKey.email, null, serviceAccountKey.key, ['https://www.googleapis.com/auth/spreadsheets']);


auth.authorize((err, tokens) => {
    if (err) {
        console.error('Error authorizing JWT client:', err);
        return;
    }
    const { access_token } = tokens;
    // Use the access token to authenticate your requests to Google Sheets
});


router.post('/', async (req, res) => {
    try {
        // Authenticate with Google Sheets API
        const client = await sheetsAuth.getClient();
        const sheetsAPI = google.sheets({ version: 'v4', auth: client });

        // Read data from Google Sheets
        const response = await sheetsAPI.spreadsheets.values.get({
            spreadsheetId
        });

        

        // Extract the values
        const values = response.data.values;

        // Return data from the first 10 columns
        const data = values.map((row) => row.slice(0, 10));

        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    res.sendStatus(201)
});


module.exports = router;