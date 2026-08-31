const express = require('express')
const userModel = require('../models/userModel')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const isEmailAlreadyExist = await userModel.findOne({ email })

    if (isEmailAlreadyExist) {
        return res.status(409).json({
            message: 'User already exist with this email'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: 'user registered successfully',
        user
    })
})

authRouter.get('/get-me', async (req, res) => {
    const token = req.cookies.jwt_token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)


    res.status(200).json({
        message: "user fetched successfully",
        user: {
            username: user.username,
            email: user.email,
        }
    })

})


authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: 'user is not found with this Email'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPassword = hash === user.password

    if (!isPassword) {
        return res.status(401).json({
            message: 'Invalid Password'
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie('jwt_token', token)

    res.status(200).json({
        message: 'user logged in successfully',
        user,
    })

})



module.exports = authRouter