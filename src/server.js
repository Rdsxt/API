const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/routes')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/', routes)

app.listen(3000, () => {
    console.warn("Fazendo atividade");
});