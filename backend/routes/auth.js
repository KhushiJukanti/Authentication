const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const AuthModel = require("../Models/auth")

const router = express.Router();



const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.', success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await AuthModel.findById(decoded._id);
        if (!user || !user.active) {
            return res.status(401).json({ message: 'Invalid token or deactivated account.', success: false });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You do not have proper role.', success: false });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

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




router.get("/user-details", async function (req, res) {
    let users = await AuthModel.find({})
    res.send(users)
})



module.exports = router