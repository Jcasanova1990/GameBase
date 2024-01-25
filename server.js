require('dotenv').config()
const app = require('./app')
const mongoose = require(mongoose)
const PORT = process.env.PORT || 3005

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Mongo Is Connected'))

app.listenerCount(PORT, () => {
    console.log(`Listening To Port,${PORT}`)
})