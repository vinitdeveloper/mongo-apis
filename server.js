require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())


app.use((req, res, next) => {
    if (req.headers['api-key'] !== "" && req.headers['api-key'] === process.env.API_KEY) {
        if (req.headers['content-type'] !== 'application/json' && req.method === 'POST') {
            res.status(405).send({ message: 'Method Not Allowed' })
        } else {
            next()
        }
    } else {
        res.status(400).send({ message: 'invalid Api key' })
    }
})

app.get('/', (req, res) => {
    res.send('Rest apis working ')
})


const documentRouter = require('./routes/documents')
const hitRouter = require('./routes/hits')

app.use('/document', documentRouter );
app.use('/hits', hitRouter );


// server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Ready to Go! http://localhost:${PORT}`);
});