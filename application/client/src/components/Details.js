import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import Axios from 'axios';
import download from 'downloadjs';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { m_id, author_username, preview_path, description, price, title, inCart, raw_path }
                        = value.detailProduct;
                    console.log(value.detailProduct);
                    console.log(value.detailProduct.raw_path)
                    return (
                        <div className="container py-5">
                            {/* title */}
                            {/* <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                             </div> */}
                            {/* end title */}

                            {/* product description */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={`http://18.191.184.143:3001/${preview_path}`}
                                        className="img-fluid"
                                        alt="product"
                                    />
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h3>title : {title}</h3>
                                    <h5 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        made by : <span className="text-uppercase">{author_username}</span>
                                    </h5>
                                    <h5 className="text-blue">
                                        <strong>
                                            price : <span>$</span>
                                            {price}
                                        </strong>
                                    </h5>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        description :
                                    </p>
                                    <p className="text-muted lead">{description}</p>
                                    {/* buttons */}
                                    <div>
                                        <Link to="/result">
                                            <ButtonContainer>Back</ButtonContainer>
                                        </Link>

                                        <ButtonContainer
                                            cart
                                            disabled={inCart ? true : false}
                                            onClick={() => {
                                                value.addToCart(m_id);
                                                value.openModel(m_id);
                                            }}>
                                            {inCart ? "inCart" : "add to cart"}
                                        </ButtonContainer>
                                        <ButtonContainer
                                            disabled={false}
                                            onClick={() => {
                                                //  if((price === 0)){

                                                Axios.post(`http://18.191.184.143:3001/download`, {
                                                    "path": "raw/2020-05-01:0.jpg"
                                                })
                                                    .then((response) => {
                                                        console.log(response);
                                                        // const content = response.headers[`${}`];
                                                        download("http://18.191.184.143:3001/download" + raw_path);
                                                    })

                                                //  } else {
                                                //      alert('Not downloadable');
                                                //  }
                                            }}
                                        >
                                            {price === 0 ? "Download" : "Contact seller"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}