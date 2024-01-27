const FavoriteGame = require('../models/favoriteGames')


exports.IndexGames = async (req, res) => {
  try {
    const games = await FavoriteGame.find()
    res.status(200).json(games)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.createGame = async (req, res) => {
  try {
    const game = new FavoriteGame(req.body)
    await game.save()
    res.status(201).json(game)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.addFavoriteGame = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.userId })
    if (!foundUser) throw new Error(`Could not locate user with id ${req.params.userId}`)

    const newFavoriteGame = new FavoriteGame(req.body)
    await newFavoriteGame.save()

    foundUser.favoriteGames.push(newFavoriteGame._id)
    await foundUser.save()

    res.status(200).json({
      msg: `Successfully added favorite game for user with id ${req.params.userId}`,
      user: foundUser,
      favoriteGame: newFavoriteGame
    })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.getGameById = async (req, res) => {
  try {
    const game = await FavoriteGame.findById(req.params.id)
    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateGame = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const game = await FavoriteGame.findById(req.params.id)
    updates.forEach(update => (game[update] = req.body[update]))
    await game.save()
    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteGame = async (req, res) => {
  try {
    await FavoriteGame.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Game Deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
