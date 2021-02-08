const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '')
    // const data = jwt.verify(token, process.env.JWT_KEY)
    console.log()
    try {
        const user = await User.findOne({ 'email': req.body.email })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'User not registered' })
    }

}
module.exports = auth