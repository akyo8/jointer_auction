const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users/signup/', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const address = await user.addWalletAddress(req.body.address)
        res.json({ 'res_code': 0, 'res_message': "User Registered successfully", 'data': { 'user': user, 'address': address } })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/addwallet', async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findByCredentials(email)
        if (!user) {
            return res.status(401).send({ error: 'Could not found user' })
        }
        const address = await user.addWalletAddress(req.body.address)
        res.send({ user, address })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/users/getbyaddress', async (req, res) => {
    console.log("Called /users/getbyaddress");
    console.log("address: ", (req.body.address).toLowerCase());
    try {
        const { address } = req.body
        const user = await User.findByAddress((address).toLowerCase())
        console.log(user)
        if (user.length < 1) {
            return res.json({ 'res_code': -1, 'res_message': "User not registered yet" })
        }
        res.json({ 'res_code': 0, 'res_message': "User found successfully", 'data': user })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/remove', async (req, res) => {
    try {
        console.log("Here ------------------ ", req.body.email);
        await User.removeUser(req.body.email)
        res.json({ 'res_code': 0, 'res_message': "User Removed successfully", 'data': {} })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router