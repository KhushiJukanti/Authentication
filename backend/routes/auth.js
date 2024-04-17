const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const AuthModel = require("../Models/auth")

const router = express.Router();

router.post("/signup", async function (req, res) {
    const { fullName, email, password, repassword } = req.body
    let isUserExist = await AuthModel.findOne({ email: email })
    if (isUserExist) {
        return res.send({ message: "User Already Exist", success: false })
    }
    const newUser = new AuthModel({ ...req.body, active: true })
    const createUser = await newUser.save();
    res.send({ message: "user Signup successfully", success: true });
})

router.post("/login", async function (req, res) {
    const { fullName, email, password, repassword } = req.body

    let isUserExist = await AuthModel.findOne({ email: email })
    if (isUserExist) {
        if (password === isUserExist.password) {
            //  token generation line pass to client
            if (isUserExist.active === false) {
                return res.send({ message: "your account has been deactivated", success: false })

            } else {
                let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey")
                return res.send({ message: "user login successfully", success: true, token: token, email: isUserExist.email, userId: isUserExist._id, role: isUserExist.role })
            }
        } else {
            return res.send({ message: "Invalid credentials", success: false })
        }
    } else {
        return res.send({ message: "User Not Exist", success: false })
    }
})

router.get("/users", async function (req, res) {
    let users = await AuthModel.find({})
    res.send(users)
})



module.exports = router