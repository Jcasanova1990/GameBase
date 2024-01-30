const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users');

let server;

beforeAll(async () => {
    server = app.listen(8081, () => console.log('Testing on PORT 8081'));
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe('Test the users endpoints', () => {
    test('Index /users - index all users', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('It should create a user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'john doe', email: 'john.doe@gmail.com', password: 'password777' });

        expect(response.statusCode).toBe(200);
        expect(response.body.user.name).toEqual('john doe');
        expect(response.body.user.email).toEqual('john.doe@gmail.com');
        expect(response.body).toHaveProperty('token');
    });

    test('It should login a user', async () => {
        const user = new User({ name: 'john doe', email: 'john.doe@gmail.com', password: 'password777' });
        await user.save();

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'john.doe@gmail.com', password: 'password777' });

        expect(response.statusCode).toBe(200);
        expect(response.body.user.name).toEqual('john doe');
        expect(response.body.user.email).toEqual('john.doe@gmail.com');
        expect(response.body).toHaveProperty('token');
    });

    test('Index user by id', async () => {
        const user = new User({ name: 'john doe', email: 'john.doe@gmail.com', password: 'password777' });
        await user.save();

        const response = await request(app)
            .get(`/users/${user._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('john doe');
        expect(response.body.email).toEqual('john.doe@gmail.com');
    });

    test('It should update a user', async () => {
        const user = new User({ name: 'john doe', email: 'john.doe@gmail.com', password: 'password777' });
        await user.save();
        const token = await user.generateAuthToken();

        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'jane doe', email: 'jane.doe@test.com' });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual('jane doe');
        expect(response.body.email).toEqual('jane.doe@test.com');
    });

    test('It should delete a user', async () => {
        const user = new User({ name: 'john doe', email: 'johndoe@gmail.com', password: 'password777' });
        await user.save();
        const token = await user.generateAuthToken();

        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('User Deleted');
    });
});
