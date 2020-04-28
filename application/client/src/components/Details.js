import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {m_id, author_username, preview_path, description, price, title, inCart}
                     = value.detailProduct;
                     console.log(value.detailProduct);
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