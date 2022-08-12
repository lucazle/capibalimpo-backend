const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const {routes} = require('./src/routes/route');
const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(routes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@capibalimpo.d9kxide.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Mongoose conectado")
        app.listen(3000)
    })
    .catch((err) => console.log(err))