import React, { Component } from 'react';
import axios from 'axios';

import { detailProduct } from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,
        cartTotal: 0
    };

    componentDidMount() { this.setProducts(); }

    setProducts = (category, query) => {
        let tempProducts;
        let tempCategory = category;

        axios.post('http://18.191.184.143:3001/browse', {
            "query": {
                "category": tempCategory,
                "search": query
            }  
        }).then((res) => {
            tempProducts = res.data.results;
            this.setState(() => { return {products: tempProducts} })
        })

    }

    getItem = (m_id) => {
        const product = this.state.products.find(item => item.m_id === m_id);
        return product;
    }

    handleDetail = (m_id) => {
        const product = this.getItem(m_id);
        this.setState(() => {
            return {detailProduct: product}
        })
    };

    addToCart = m_id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(m_id));

        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price
        product.total = price;

        this.setState(() => {
            return {products: tempProducts, cart: [...this.state.cart, product]}
        }, () => { this.addTotals(); });
    };

    openModel = m_id => {
        const product = this.getItem(m_id)
        this.setState(() => {
            return {modelProduct: product, modelOpen: true}
        })
    }

    closeModel = () => {
        this.setState(() => {
            return {modelOpen: false}
        })
    }

    removeItem = (m_id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.m_id !== m_id);
        const index = tempProducts.indexOf(this.getItem(m_id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return { cart: [...tempCart], products: [...tempProducts] }
        }, () => { this.addTotals(); })
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        }, () => {
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let total = 0;
        this.state.cart.map(item => (total += item.total))

        this.setState(() => { return { cartTotal: total } })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModel: this.openModel,
                closeModel: this.closeModel,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                setProducts: this.setProducts
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };