import React from 'react'
import { useParams } from 'react-router-dom'
import { useReducer, useEffect } from 'react'

// React-Bootstrap Components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import axios from 'axios'

import Rating from '../components/Rating'


function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, product: action.payload }
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }

}




export default function ProductDetails() {
    const params = useParams()
    const { slug } = params


    const [{ product, loading, error }, dispatch] = useReducer(reducer,
        {
            product: [],
            loading: true,
            error: ''

        }
    )

    useEffect(() => {

        async function fetchData() {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let results = await axios.get(`/api/product/slug/${slug}`)
                console.log(`from backend: ${results}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: results.data })

            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: error.message })
            }

        }

        fetchData()
    }

        , [slug])


    return (
        <Row className=''>
            <Col md={6}>
                <img className='img-large' src={product.image} alt={product.name}></img>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item> <h3>{product.name}</h3></ListGroup.Item>
                    <ListGroup.Item><Rating rating={product.rating} numReviews={product.numReviews} /></ListGroup.Item>
                    <ListGroup.Item> Price : ${product.price} </ListGroup.Item>
                    <ListGroup.Item> Description: {product.description} </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3} className=''>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock > 0 ? (<Badge bg="success"> In Stock {` (${product.countInStock})`}</Badge>) : (<Badge bg="danger">Sold Out</Badge>)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button className='btn-primary'><strong>ADD TO CART</strong></Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

            </Col>

        </Row>
    )
}
