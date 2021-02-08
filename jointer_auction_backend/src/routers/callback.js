const express = require('express')

const router = express.Router()

router.post('/callbackHandle', async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router