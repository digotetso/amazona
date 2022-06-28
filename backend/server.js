import express from 'express'
import data from './data.js'

const app = express()

app.get('/api/products', (req, res) => {
    res.send(data.products)
})
app.get('/api/product/slug/:slug', (req, res) => {


    const product = data.products.find(x => x.slug === req.params.slug)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product not found" })
    }

})

const port = process.env.PORT || 9001

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})