require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Rest apis working ')
})


const documentRouter = require('./routes/documents')

app.use('/document', documentRouter );


// server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Ready to Go! http://localhost:${PORT}`);
});