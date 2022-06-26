import express from 'express'
import data from './data.js'

const app = express()

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

const port = process.env.PORT || 9001

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})