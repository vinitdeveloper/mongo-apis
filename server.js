require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

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