const express = require('express')
const router = express.Router()
const favoriteGameController = require('../controllers/favoriteGameController')

router.get('/', favoriteGameController.IndexGames)
router.post('/', favoriteGameController.createGame)
router.post('/:favoriteGameId/users/:userId', favoriteGameController.addFavoriteGame)
router.get('/:id', favoriteGameController.getGameById)
router.put('/:id', favoriteGameController.updateGame)
router.delete('/:id', favoriteGameController.deleteGame)

module.exports = router