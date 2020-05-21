import React, { Component, useState } from 'react';
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
    sendingApproval
} from '../redux/actions/purchaseAction';

import { connect } from 'react-redux';

const Details = ({
    buyer,
    seller,
    status,
    soldAmount,
    m_id,
    transactionId,
    dispatch,
    username,
    isLoggedIn
}) => {

    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    const [message, setMessage] = useState("");

    const contactSeller = (username) => {
        const axios = require("axios");
        console.log("contact seller:", message);
        axios.defaults.withCredentials = true;


  //TODO change back to aws ip address. 
        axios.get("http://localhost:3001/get_acc_id", {params: {"username": username}})
        .then(res => {
            var body = {
                "acc_id": res.data.acc_id,
                "message": message,
                // buy_request = 0 is for messaging
                //buy_request = 1 is for for buying product
                "buy_request": 1,
            }
            return axios.post("/message", body)
            .then(res => {
                // console.log("message sent");
                setMessage("");
            }).catch(err => {
                // console.log("message not sent");
            })
        })




    }

    const getAccID = () => {
        const axios = require("axios");
        axios.defaults.withCredentials = true;

        axios.get("/get_acc_id", )


    }

    const download = (raw_path) => {
        console.log('Checking logged in');
        console.log(isLoggedIn);
        if(isLoggedIn){
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
        } else {
            alert('You must be logged in to download');
        }
    }

    return (
        <ProductConsumer>
            {(value) => {
                // Item information. From seller
                const { m_id, author_username, preview_path, description, price, title, inCart, raw_path, approved }
                    = value.detailProduct;
                console.log(value.detailProduct);
                console.log(value.detailProduct.raw_path)
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
                                    uploader : <span className="text-uppercase">{author_username}</span>
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
                                    {price === 0 ?
                                        <ButtonContainer
                                            disabled={false}
                                            onClick={() => download(raw_path)}>Download
                                            </ButtonContainer> :
                                        <ButtonContainer type="button" data-toggle="modal" data-target="#myModal"> Contact Seller
                                                </ButtonContainer>}
                                    <div class="container">

                                        {/* <!-- The Modal --> */}
                                        <div class="modal" id="myModal">
                                            <div class="modal-dialog">
                                                <div class="modal-content">

                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Contact Seller</h4>
                                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    </div>
                                                    <form>

                                                        <div class="form-group">
                                                            <label for="message-text" class="col-form-label">Message:</label>
                                                            <textarea class="form-control" id="message-text" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                                        </div>

                                                    </form>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary" onClick={() => contactSeller(value.detailProduct.author_username)} data-dismiss="modal">Send message</button>
                                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

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
        isLoggedIn: state.loginReducer.isLoggedIn
    };
};

export default connect(mapStateToProps)(Details);