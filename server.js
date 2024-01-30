require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3006;

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Mongo Is Connected'))

app.listen(PORT, () => {
    console.log(`Listening To Port,${PORT}`);
});
