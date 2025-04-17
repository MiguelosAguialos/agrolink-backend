const express = require('express')
const app = express()
var cors = require('cors')
const consumidorService = require('../services/consumidor.service')

const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/newConsumidor', (req, res) => {
    const user = req.body.user
    res.send(consumidorService.createUserConsumidor(user))
})

app.listen(port, () => {
    console.log(`Application running on port: ${port}`)
})