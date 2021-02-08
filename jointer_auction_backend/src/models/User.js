const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    contactNumber: {
        type: String,
        unique: true
    },
    wallets: [{
        type: String,
        unique: true
    }]
})

userSchema.methods.addWalletAddress = async function (address) {
    const user = this
    user.wallets = user.wallets.concat(address)
    await user.save()
    return address
}

userSchema.statics.removeUser = async function (email) {
    console.log(email)
    await User.remove({ email },
        function (err) {
            if (err) console.log(err);
            //  else    res.redirect('/view');
        })
    return;
}

userSchema.statics.findByCredentials = async (email) => {
    // Search for a user by email.
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

userSchema.statics.findByAddress = async (address) => {
    // Search for a user by email.
    const user = await User.find({ wallets: address })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User