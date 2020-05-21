import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import Axios from 'axios';
import download from 'downloadjs';
import ReactGA from 'react-ga';
import {
    setBuyer,
    setSeller,
    setSoldAmount,
    setStatus,
    setTransactionId,
    setM_id,
    sendingApproval,
} from '../redux/actions/purchaseAction';

import { connect } from 'react-redux';

const Details = ({
    buyer,
    seller,
    status,
    soldAmount,
    transactionId,
    dispatch,
    username,
    isLoggedIn
}) => {

    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    
    const sendForApproval = () => {
        dispatch(setBuyer(username)); 
        // dispatch(setSeller()); //Already done on button click
        dispatch(setStatus(false));
        // dispatch(setTransactionId());
        dispatch(setM_id(m_id));
        // dispatch(setSoldAmount);
        console.log(buyer);
        // console.log(status);
        // console.log(m_id);
        dispatch(sendingApproval());
    }

    const download = (raw_path) => {
        const formData = new FormData();
        formData.append('path', raw_path);
        fetch("/download", {
            method: 'POST',
            body: formData,
        })
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = raw_path.substr(4);
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again         
        }).catch(err => console.log(err))
    }

    let m_id, author_username, preview_path, description, price, title, inCart, raw_path, approved;
    const Cookies = require('js-cookie');
    const media = JSON.parse(Cookies.get('m_id'));
    m_id = media.m_id;
    author_username = media.username
    preview_path = media.preview_path;
    description = media.description;
    price = media.price;
    title = media.title;
    inCart = false;
    raw_path = media.raw_path;


    return (
        <ProductConsumer>
            { (value) => {
                // Item information. From seller
                return (
                    <div className="container py-5">

                        <div className="row">
                            <div className="col-10 mx-auto col-md-6 my-3">
                                <img src={`/${preview_path}`}
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
                                            const formData = new FormData();
                                            formData.append('path', raw_path);
                                            fetch("/download", {
                                                method: 'POST',
                                                body: formData,
                                                credentials: 'include'
                                            })
                                            .then(response => response.blob())
                                            .then(blob => {
                                                var url = window.URL.createObjectURL(blob);
                                                var a = document.createElement('a');
                                                console.log(url)
                                                a.href = url;
                                                a.download = raw_path.substr(4);
                                                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                                                a.click();    
                                                a.remove();  //afterwards we remove the element again         
                                            }).catch(err => console.log(err))
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
        username: state.loginReducer.username,
    };
};

export default connect(mapStateToProps) (Details);