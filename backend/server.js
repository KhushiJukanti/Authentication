const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const authRoutes = require('./routes/auth')

dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Mongodb connected!')
}).catch((error)=>{
    console.log(error)
})

app.use("/auth", authRoutes)


app.get('/', function (req, res) {
    res.send('Hello Author')
})

app.listen(7000, () => {
    console.log("server is running at 7000")
})