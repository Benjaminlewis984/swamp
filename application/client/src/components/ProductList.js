import React, { Component } from 'react'
import Product from './Product.js'
import Title from './Title'
import { ProductConsumer } from '../context';

export default class ProductList extends Component {

    render() {
        return (
            <React.Fragment>
                {/* <div className="container">
                    <Title name="swamp." />

                    <div className="row text-center col-10 mx-auto my-2 justify-content-center">
                        <h3>A media marketplace for gators, by gators.</h3>
                    </div>
                </div> */}

                <div className="py-5">
                    <div className="container">
                        {/* <Title name="our" title="products" /> */}

                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return <Product key={product.m_id} product=
                                            {product} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}