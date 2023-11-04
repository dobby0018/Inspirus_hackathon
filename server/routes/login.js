const express = require('express');
const router = express.Router();
const mysql = require("mysql");


require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
    connectionLimit: 1000,
    host: DB_HOST,       //This is your localhost IP
    user: DB_USER,        // "newuser" 
    password: DB_PASSWORD,   // password 
    database: DB_DATABASE,      // Database name
    port: DB_PORT,          // port name, "3306" 
    connectTimeout: 60000,
})

// const port = process.env.PORT
// app.listen(port,
//     () => console.log(`Server Started on port ${port}...`))


db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connection successful!" + connection.threadId)
})

//const bcrypt = require("bcrypt")
router.use(express.json())
// const users = [
//     { id: 1, username: 'user', password: 'password' }
// ];

router.post('/', async(req, res) => {

    const name = req.body.coachName
    const password = req.body.password
        

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "Select * from users where Name = ?"
        const search_query = mysql.format(sqlSearch, [name])

        await connection.query(search_query, async (err, result) => {

            connection.release()

            if (err) {
                res.sendStatus(500);
                console.log(err)
                console.log(res);
            }

            if (result.length === 0) {
                console.log("--------> User does not exist")
                res.sendStatus(301)
            }

            else {
               // const hashedPassword = result[0].Password
                //get the hashedPassword from result

                const storedPassword = result[0].Password;


                if (password === storedPassword) {
                    console.log("---------> Login Successful");


                    res.status(200);
                    res.send(`${name} is logged in!`);

                    router.get('/pages/login', async (req, res) => {
                        try {
                            const connection = await db.getConnection();
                            const result = await connection.query(`SELECT Name, Team FROM users WHERE Name = ?`, [name]);
                            const data = { name: result[0].Name, team: result[0].Team };
                            res.json(data);
                        } catch (error) {
                            console.error(error);
                            res.status(500).json({ message: 'Error fetching name and team' });
                        }
                    });

                    

                }

                else {
                    console.log("---------> Password Incorrect")

                    res.status(302);
                    res.send("Password incorrect!")
                }
            }
        })
    })
});





module.exports = router;
