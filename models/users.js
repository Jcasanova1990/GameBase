require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt =('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.userSchema({
    name: String,
    email: String,
    password: String
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this.id }, 'secret')
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User