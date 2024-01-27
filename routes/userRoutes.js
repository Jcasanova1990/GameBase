const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.indexUsers)
router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/:id', userController.indexUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router