const express = require('express');

const mysql = require("mysql");
const router = express.Router();


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
    port: DB_PORT ,        // port name, 
    connectTimeout: 60000,

})


db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connection successful!" + connection.threadId)
})


const bcrypt = require("bcrypt")
const saltRounds = 10
router.use(express.json())

router.post('/', async (req, res) => {
    const name = req.body.coachName;
    const pword = req.body.password;
    const team = req.body.teamName  
    console.log(name)
    console.log(pword)
    console.log(team)
    console.log(req.body)

    
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // async function hashPassword(pword) {
    //     const hashedPassword = await bcrypt.hash(pword, 10);
    //     return hashedPassword;
    // }

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM users WHERE Name = ?"
        const search_query = mysql.format(sqlSearch, [name])
        const sqlInsert = "INSERT INTO  users (Id,Name,Password,Team) VALUES (0,?,?,?)";
        const insert_query = mysql.format(sqlInsert, [name,pword, team])

        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("--------> Created new User")
                    console.log(result.insertId)

                    router.post('/register', async (req, res) => {
                        try {
                            const connection = await db.getConnection();
                            const result = await connection.query(`SELECT Name, Team FROM users WHERE ID = ?`, [name]);
                            const data = { name: result[0].Name, team: result[0].Team };
                            res.json(data);
                        } catch (error) {
                            console.error(error);
                            res.status(500).json({ message: 'Error fetching name and team' });
                        }
                    });
                    res.sendStatus(201)
                })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
});//end of router.post()


module.exports = router;
