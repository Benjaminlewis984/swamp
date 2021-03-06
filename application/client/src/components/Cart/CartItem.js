import React from 'react'

export default function CartItem({item, value}) {
    const {m_id, title, preview_path, price} = item;
    const {removeItem} = value;

    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={`/${preview_path}`} style={{width:'5rem', height: '5rem'}}
                className="img-fluid" alt="product" />
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeItem(m_id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                ${price}
            </div>
        </div>
    )
}
