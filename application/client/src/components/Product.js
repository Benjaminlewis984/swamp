import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context'
import PropTypes from 'prop-types'
import Axios from 'axios';

export default class Product extends Component {
    render() {
        const { m_id, title, preview_path, price, inCart, raw_path } = this.props.product;
        function sendMediaID() {
            const Cookies = require('js-cookie');
            Axios.get('/media', {params: {
                m_id: m_id
            }})
            .then((results) => {
                if(results.data.success == "true") {
                    console.log(results.data.media[0])
                    Cookies.set('m_id', results.data.media[0]);
                }
            })
        }
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                    {(value) => (
                    <div className="img-container p-5" onClick={() => {
                        if (m_id >= 0) { value.handleDetail(m_id); }
                        // Else should route to Default component
                        else { console.log("No product ID") }
                        }
                    }>
                        <Link to="/details" target="_blank" onClick={sendMediaID}>
                            <img src={`/${preview_path}`} 
                            className="card-img-top img-fluid" 
                            alt="product" 
                            style={{margin:'auto'}}/>
                        </Link>
                        <button className="cart-btn" disabled={inCart ? true : false} 
                        onClick={() => {
                            value.addToCart(m_id);
                            value.openModel(m_id);
                            }}>
                        {inCart ? 
                            (<p className="text-capitalize mb-0" disabled>
                            {" "}
                            In Cart</p>) :
                             (<i className="fas fa-cart-plus" />)}
                        </button>
                    </div>)}
                    
                    </ProductConsumer>

                    {/* Card Footer */}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">$</span>
                            {price}
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        m_id: PropTypes.number,
        preview_path: PropTypes.string,
        raw_path: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

const ProductWrapper = styled.div`

.card {
    border-color: var(--mainBlue);
    border-width: medium;
    transition: all 0.3s linear;
}

.card-footer {
    background: var(--cardFooter);
    border-top: transparent;
    transition: all 1s linear;
}

&: hover {
    .card {
        border: 0.4rem solid rgba(153, 50, 204, 10.2);
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
        background: var(--cardHighlight);
    }
}

.img-container {
    position: relative;
    overflow: hidden;
    height: 12rem;
}

<<<<<<< Updated upstream
.card-img-top {
    
    transition: all 0.3s linear;
}
=======

>>>>>>> Stashed changes

.img-container:hover .card-img-top {
    transform: scale(1.2);
}

.cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--mainBlack);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.3s linear;
}

.img-container:hover .cart-btn {
    transform: translate(0, 0);
}

.cart-btn:hover {
    color: var(--lightBlue);
    cursor: pointer;
}
`