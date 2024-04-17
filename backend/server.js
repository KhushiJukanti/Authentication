const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')


mongoose.connect("mongodb://localhost:27017/Authentication")

const app = express()
app.use(express.json())
app.use(cors())


app.use("/auth", authRoutes)


app.get('/', function (req, res) {
    res.send('Hello Author')
})

app.listen(7000, () => {
    console.log("server is running at 7000")
})