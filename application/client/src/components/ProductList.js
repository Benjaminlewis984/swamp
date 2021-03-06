import React, { Component } from 'react'
import Product from './Product.js'
import Disclaimer from "./Disclaimer";
import Title from './Title'
import { ProductConsumer } from '../context';
import ReactGA from 'react-ga';
export default class ProductList extends Component {

    render() {
        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
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
                    <Disclaimer />
                </div>
            </React.Fragment>
        )
    }
}