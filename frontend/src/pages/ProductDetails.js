import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useReducer, useEffect } from 'react'

// React-Bootstrap Components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import axios from 'axios'

import Rating from '../components/Rating'
import { getError } from '../utils'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { store } from '../store'


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
            loading: false,
            error: ''

        }
    )

    // use the context i have created
    const { state, dispatch: ctxdispatch } = useContext(store)

    const addToCartHandler = async () => {
        const { cart } = state

        const existItem = cart.cartItems.find((x) => x._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1

        const { data } = await axios.get(`/api/product/${product._id}`)


        if (data.countInStock < quantity) {
            window.alert('This product is out of stock')
        }

        ctxdispatch({
            type: "ADD_TO_CART",
            payload: { ...product, quantity }
        })


    }




    useEffect(() => {

        async function fetchData() {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let results = await axios.get(`/api/product/slug/${slug}`)
                console.log(`from backend: ${results}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: results.data })

            } catch (error) {
                console.log(getError(error))
                console.log(error.message)
                //dispatch({ type: 'FETCH_FAILED', payload: error.message });
                dispatch({ type: 'FETCH_FAILED', payload: getError(error) });

            }

        }

        fetchData()
    }

        , [slug]) // when slug changes re-render the component 


    return (<>
        {
            loading ? (<LoadingBox />)
                : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (<Row className=''>
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
                                                <Button className='btn-primary' onClick={addToCartHandler}><strong>ADD TO CART</strong></Button>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                        </Col>

                    </Row>)

        }
    </>
    )
}
