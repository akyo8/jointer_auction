const express = require('express')
require('dotenv').config()
console.log("-----------------------", process.env.PORT, "-----------------")
const port = process.env.PORT
const userRouter = require('./routers/user')
const callBack = require('./routers/callback')
require('./db/db')

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(userRouter)
app.use(callBack)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})