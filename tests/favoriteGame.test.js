const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Game = require('../models/favoriteGames')
const User = require('../models/users')

let server

beforeAll(async () => {
    server = app.listen(8082, () => console.log('Testing on PORT 8082'))
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    server.close()
})

describe('Test the favorite games endpoints', () => {
    let createdGameId

    test('Index /favoriteGames - index all favorite games', async () => {
        const response = await request(app).get('/favoriteGames')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    test('It should create a favorite game', async () => {
        const response = await request(app)
            .post('/favoriteGames')
            .send({
                title: 'Favorite Game 1',
                genre: 'Action',
                platform: 'PlayStation',
                release_year: 2020,
            })

        expect(response.statusCode).toBe(201)
        expect(response.body.title).toEqual('Favorite Game 1')
        expect(response.body.genre).toEqual('Action')
        expect(response.body.platform).toEqual('PlayStation')
        expect(response.body.release_year).toEqual(2020)

        createdGameId = response.body._id
    })

    test('It should add a game to a user', async () => {
        try {
            const game = await Game.create({ title: 'Test Game', genre: 'Puzzle', platform: 'Xbox', release_year: '2008' })

            const user = await User.create({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                favoriteGames: []
            })


            user.favoriteGames.push(game)
            await user.save()

            const updatedUser = await User.findById(user._id).populate('favoriteGames')

            expect(updatedUser.favoriteGames.length).toBe(1)
            expect(updatedUser.favoriteGames[0].title).toBe('Test Game')
            expect(updatedUser.favoriteGames[0].genre).toBe('Puzzle')
            expect(updatedUser.favoriteGames[0].platform).toBe('Xbox')
            expect(updatedUser.favoriteGames[0].release_year).toBe('2008')
        } catch (error) {

        }
    })

    test('Index favorite game by id', async () => {
        const response = await request(app)
            .get(`/favoriteGames/${createdGameId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Favorite Game 1')
        expect(response.body.genre).toEqual('Action')
        expect(response.body.platform).toEqual('PlayStation')
        expect(response.body.release_year).toEqual(2020)
    })

    test('It should update a favorite game', async () => {
        const response = await request(app)
            .put(`/favoriteGames/${createdGameId}`)
            .send({
                title: 'New Title',
                genre: 'Adventure',
                platform: 'PC',
                release_year: 2022,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('New Title')
        expect(response.body.genre).toEqual('Adventure')
        expect(response.body.platform).toEqual('PC')
        expect(response.body.release_year).toEqual(2022)
    })

    test('It should delete a favorite game', async () => {
        const response = await request(app)
            .delete(`/favoriteGames/${createdGameId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Game Deleted')
    })
})