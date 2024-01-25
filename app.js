const express = require('express')
const morgan = require('morgan')
const favoriteGamesrRoutes = require('./routes/favoriteGamesRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/favoriteGames', favoriteGamesrRoutes)

module.exports = app