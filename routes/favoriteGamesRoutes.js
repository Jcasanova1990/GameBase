const express = require('express')
const router = express.router()
const favoriteGamesController = require('../controllers/favoriteGamesController')

router.get('/', favoriteGamesController.IndexGames)
router.post('/', favoriteGamesController.createGame)
router.post('/favoriteGameId/users/:userId', favoriteGamesController.addFavoriteGame)
router.get('/:id', favoriteGamesController.getGameById)
router.put('/:id', favoriteGamesController.updateGame)
router.delete('/:id', favoriteGamesController.deleteGame)

module.exports = router