import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';

export default function CartList({value}) {
    const { cart } = value

    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key={item.m_id} item={item}
                value={value} />
            })}
        </div>
    )
}
