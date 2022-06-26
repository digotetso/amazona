import React, { useReducer } from 'react'

import axios from 'axios'
import { useEffect } from 'react';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap'




function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, products: action.payload }
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }

}

function HomeScreen() {

    const [{ products, loading, error }, dispatch] = useReducer(reducer,
        {
            products: [],
            loading: true,
            error: ''

        }
    )

    useEffect(() => {

        async function fetchData() {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let results = await axios.get('/api/products')
                console.log(results)
                dispatch({ type: 'FETCH_SUCCESS', payload: results.data })

            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: error.message })
            }

        }

        fetchData()
    }

        , [])

    console.log(loading)

    return (
        <div>

            <h1 className="heading">Featured products</h1>
            <div className="products">
                {loading ? (<div> Loading...</div>) :
                    error ? (<div>{error}</div>) :
                        <Row > {
                            (products.map(product => (
                                <Col key={product.slug} sm={6} md={4} lg={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                            )
                        }
                        </Row>
                }
            </div>
        </div>
    )
}

export default HomeScreen