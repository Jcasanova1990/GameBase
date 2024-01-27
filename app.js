const express = require('express')
const morgan = require('morgan')
const favoriteGameRoutes = require('./routes/favoriteGameRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/favoriteGames', favoriteGameRoutes)

module.exports = app