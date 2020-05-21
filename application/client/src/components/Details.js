import React, { useState } from 'react';
import { ProductConsumer } from '../context';
import { Link, useHistory } from 'react-router-dom';
import { ButtonContainerAlt } from './ButtonAlt';
import ReactGA from 'react-ga';

import { connect } from 'react-redux';

const Details = ({
    isLoggedIn
}) => {

    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    const [message, setMessage] = useState("");
    let history = useHistory();

    const contactSeller = (username, mid) => {
        const axios = require("axios");
        console.log("contact seller:", message);
        console.log("username", username)
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
                "m_id": mid,
            }
            console.log(res.data)
            return axios.post("/message", body)
            .then(res => {
                setMessage("");
                console.log("message sent")
            }).catch(err => {
                console.log("message not sent");
            })
        })

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



    return (
        
        <ProductConsumer>
            { (value) => {
                let {m_id, author_username, preview_path, description, price, title, inCart, raw_path, approved, bought}
                    = value.detailProduct;
                
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
                                    <ButtonContainerAlt
                                        cart
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            value.addToCart(m_id);
                                            value.openModel(m_id);
                                        }}>
                                        {inCart ? "inCart" : "add to cart"}
                                    </ButtonContainerAlt>

                                    {price === 0 || bought === "true"?
                                        <ButtonContainerAlt
                                            disabled={false}
                                            onClick={() => {
                                                if (isLoggedIn === false) { history.push("/signup") }
                                                else { download(raw_path) }
                                                }
                                            }>Download
                                            </ButtonContainerAlt> :
                                        <ButtonContainerAlt type="button" data-toggle="modal" data-target="#myModal"> Contact Seller
                                        </ButtonContainerAlt>}

                                    <Link to="/result">
                                        <ButtonContainerAlt>Back</ButtonContainerAlt>
                                    </Link>
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
                                                        <button type="button" class="btn btn-primary" onClick={() => contactSeller(value.detailProduct.author_username, value.detailProduct.m_id)} data-dismiss="modal">Send message</button>
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
        isLoggedIn: state.loginReducer.isLoggedIn
    };
};

export default connect(mapStateToProps)(Details);