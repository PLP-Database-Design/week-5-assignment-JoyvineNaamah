// impoting the necessary dependancies
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// create a connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection not successful
    if(err) {
        return console.log("Error connecting to MySQL", err)
    }

    // connection successful
    console.log("MySQL connection successful")
})

// get patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"

    db.query(getPatients, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the patients")
        }
        // get back results
        res.status(200).send(results)
    })
})

app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"

    db.query(getProviders, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the providers")
        }
        // get back results
        res.status(200).send(results)
    })
})


app.get('/get-patient-name', (req, res) => {
    const getName = "SELECT * FROM patients WHERE first_name = 'Ted'"

    db.query(getName, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the patients")
        }
        // get back results
        res.status(200).send(results)
    })
})

app.get('/get-provider-specialty', (req, res) => {
    const getSpecialty = "SELECT first_name, last_name, provider_specialty FROM providers ORDER BY provider_specialty"

    db.query(getSpecialty, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the providers")
        }
        // get back results
        res.status(200).send(results)
    })
})
// declare the port and listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})