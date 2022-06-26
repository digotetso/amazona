import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';
import logger from 'use-reducer-logger';




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
                        (products.map(product => (
                            <div key={product.slug}>
                                <div className="product">
                                    <img src={product.image} alt={product.name} />
                                    <div className="product-info">
                                        <Link to={`products/${product.slug}`}>
                                            <p>{product.name}</p>
                                        </Link>
                                        <p> <strong>${product.price}</strong></p>
                                        <button>Add to cart</button>
                                    </div>

                                </div>
                            </div>
                        ))
                        )
                }
            </div>
        </div>
    )
}

export default HomeScreen