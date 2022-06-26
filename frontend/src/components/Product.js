import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from './Rating'

const Product = ({ product }) => {
    return (

        <Card className="product">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Link to={`products/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text> <strong>${product.price}</strong></Card.Text>
                <Button variant="primary"> <strong>Add to cart</strong></Button>
            </Card.Body>
        </Card>
    )
}

export default Product