import React from 'react'
import { Link } from 'react-router-dom'
import data from '../data'
function HomeScreen() {
    return (
        <div>
            <h1 className="heading">Featured products</h1>
            <div className="products">
                {data.products.map(product => (
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
                ))}
            </div>
        </div>
    )
}

export default HomeScreen