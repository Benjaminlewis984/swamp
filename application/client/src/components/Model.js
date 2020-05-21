import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainerAlt } from './ButtonAlt';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'


export default class Model extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {modelOpen, closeModel} = value;
                    const {preview_path, title, price} = value.modelProduct;

                    if(!modelOpen) { return null; }
                    else {
                    return ( <ModelContainer>
                        <div className="container">
                            <div className="row">
                                <div id="model" className="col-8 mx-auto col-md-6 
                                col-lg-4 text-center text-capitalize">
                                    <h5>Item added</h5>
                                    <img src={`http://18.191.184.143:3001/${preview_path}`} className="img-fluid" 
                                    alt="product" style={{width:'5rem', height: '5rem'}}
                                    />
                                    <h5>{title}</h5>
                                    <h5 className="text-muted">price : $ {price}</h5>
                                    <Link to='/cart'>
                                        <ButtonContainerAlt cart onClick={() => closeModel()}>
                                            view cart
                                        </ButtonContainerAlt>
                                    </Link>
                                    <Link to='/result'>
                                        <ButtonContainerAlt onClick={() => closeModel()}>
                                            continue shopping
                                        </ButtonContainerAlt>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ModelContainer>
                    );
                }
            }}
            </ProductConsumer>
        )
    }
}

const ModelContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.3);
display: flex;
align-items: center;
justify-content: center;

#model {
    background: var(--mainWhite);
}
`