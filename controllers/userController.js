const User = require('../models/users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
    const user = await User.findOne({ _id: data._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.indexUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.json({ user, token})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !await bcryptjs.compare(req.body.password, user.password)) {
      res.status(400).send('Invalid Login Credentials')
    } else {
      const token = await user.generateAuthToken()
      res.json({ user, token})
    }
  } catch (error){
    res.status(400).json({ message: error.message})
  }
}

exports.indexUserById = async (req, res) => {
  try {
    const userItem = await User.findById(req.params.id)
    res.status(200).json(userItem)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const user = await User.findOne({_id: req.params.id})
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    res.json(user)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne()
    res.json({message: 'User Deleted'})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}