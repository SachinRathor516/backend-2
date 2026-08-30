const express = require('express')
const authRouter = express.Router()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

//POST /api/auth/register
authRouter.post('/register', async (req, res) => {

    const { username, email, password } = req.body

    const isEmailExist = await userModel.findOne({ email })

    if (isEmailExist) {
        return res.status(409).json({
            message: 'user Already exist with this email'
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create(
        {
            username,
            email,
            password: hash
        })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    }, process.env.JWT_SECRET)

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: 'user register successfully',
        user,
        token
    })

})

authRouter.post('/protected' , (req ,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message: 'get token'
    })
    
})

authRouter.post('/login' , async(req , res)=>{

    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if (!user) {
        return res.status(404).json({
            message: 'user not found with this email'
        })
    }

    const isPassword = await user.password === crypto.createHash('md5').update(password).digest('hex')

    if (!isPassword) {
        return res.status(401).json({
            message: 'Invalid Password'
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET)

    res.cookie('jwt_token' , token)

    res.status(200).json({
        message: 'user logged in ',
        user,
    })
})



module.exports = authRouter