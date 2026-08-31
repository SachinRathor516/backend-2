const express = require('express')
const userModel = require('../models/userModel')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')



authRouter.post('/register', async (req, res) => {

    const { username, email, password } = req.body

    const isEmailAlreadyExist = await userModel.findOne({ email })

    if (isEmailAlreadyExist) {
        return res.status(409).json({
            message: 'user Already exist with this Email'
        })
    }

    const user = await userModel.create(
        {
            username,
            email,
            password
        })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)


    res.status(201).json({
        message: 'user registered successfully',
        user,
        token
    })
})


module.exports = authRouter