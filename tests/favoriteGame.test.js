const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const FavoriteGame = require('../models/favoriteGame')

let server

beforeAll(async () => {
    server = app.listen(8080, () => console.log('Testing on PORT 8080'))
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    server.close()
})

describe('Test the favorite games endpoints', () => {
    test('Index /favoriteGames - index all favorite games', async () => {
        const response = await request(app).get('/favoriteGames')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    test('It should create a favorite game', async () => {
        const response = await request(app)
            .post('/favoriteGames')
            .send({ name: 'Favorite Game 1', description: 'Description of Favorite Game 1' })

        expect(response.statusCode).toBe(200)
        expect(response.body.favoriteGame.name).toEqual('Favorite Game 1')
        expect(response.body.favoriteGame.description).toEqual('Description of Favorite Game 1')
    })

    test('It should add a favorite game for a user', async () => {
        const userId = 'valid_user_id'

        const response = await request(app)
            .post(`/favoriteGames/favoriteGameId/users/${userId}`)
            .send({ favoriteGameId: 'favorite_game_id' })

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Favorite game added for user')
    })

    test('Index favorite game by id', async () => {
        const gameId = 'valid_game_id'

        const response = await request(app)
            .get(`/favoriteGames/${gameId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Name of favorite game')
        expect(response.body.description).toEqual('Description of favorite game')
    })

    test('It should update a favorite game', async () => {
        const gameId = 'valid_game_id'

        const response = await request(app)
            .put(`/favoriteGames/${gameId}`)
            .send({ name: 'New Name', description: 'New Description' })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('New Name')
        expect(response.body.description).toEqual('New Description')
    })

    test('It should delete a favorite game', async () => {
        const gameId = 'valid_game_id'

        const response = await request(app)
            .delete(`/favoriteGames/${gameId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Favorite game deleted')
    })
})
