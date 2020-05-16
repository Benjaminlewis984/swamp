import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import Axios from 'axios';
import download from 'downloadjs';
import {
    setBuyer,
    setSeller,
    setSoldAmount,
    setStatus,
    setTransactionId,
    setM_id,
} from '../redux/actions/purchaseAction';
import { connect } from 'react-redux';

const Details = ({
    buyer,
    seller,
    status,
    soldAmount,
    m_id,
    transactionId,
}) => {

    const sendForApproval = () => {
        dispatch(setBuyer(author_username));
        dispatch(setSeller());
        dispatch(setStatus(false));
        dispatch(setTransactionId());
        dispatch(setM_id(m_id));
        dispatch(setSoldAmount);

        document.getElementById('signup-form').value = '';
    }

    return (
        <ProductConsumer>
            {(value) => {
                const { m_id, author_username, preview_path, description, price, title, inCart, raw_path, approved }
                    = value.detailProduct;
                console.log(value.detailProduct);
                console.log(value.detailProduct.raw_path)
                return (
                    <div className="container py-5">

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
                                            console.log('Here is raw - path ' + raw_path);
                                            Axios.post(`http://18.191.184.143:3001/download`, {
                                                "path": raw_path
                                            })
                                                .then((response) => {
                                                    console.log(response);
                                                    if(price === 0){
                                                        approved = true;
                                                        download(response.data);
                                                        approved = false;
                                                    } else {
                                                        // Logic for contacting seller
                                                        
                                                    }
                                                })
                                        }
                                        }
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

const mapStateToProps = state => {
    return {
        buyer: state.purchaseReducer.buyer,
        seller: state.purchaseReducer.seller,
        status: state.purchaseReducer.status,
        transactionId: state.purchaseReducer.transactionId,
        soldAmount: state.purchaseReducer.soldAmount,
        m_id: state.purchaseReducer.m_id,
    };
};

export default connect(mapStateToProps) (Details);