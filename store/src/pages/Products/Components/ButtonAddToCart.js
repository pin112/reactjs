import React, {Component} from 'react';
import {Button, Icon, Confirm} from "semantic-ui-react";

import createHistory from 'history/createBrowserHistory';
const history = createHistory({
    forceRefresh: true
});

class ButtonAddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    show = () => this.setState({ open: true });
    handleConfirm = () => {
        this.setState({ open: false });

        history.push('/checkout');
        history.go(-1);
        //history.goBack();

    }

    handleCancel = () => {
        this.setState({ open: false });
    }

    onAddToCart = (product) => {
        const shoppingCartItems = JSON.parse(localStorage.getItem('shopping-cart') || '[]');

        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price.price,
            discount: product.promotion.discount,
            quantity: 1
        };

        this.show();

        let isExist = false;
        for (let i = 0; i < shoppingCartItems.length; i++) {
            if (shoppingCartItems[i].id === cartItem.id) {
                shoppingCartItems[i].quantity++;
                localStorage.setItem('shopping-cart', JSON.stringify(shoppingCartItems));
                return false;
            }
        }

        if (isExist === false) {
            shoppingCartItems.push(cartItem);
            localStorage.setItem('shopping-cart', JSON.stringify(shoppingCartItems));
        }
    }

    render() {
        return(
            <span>
                <Button content='Add to cart' positive onClick={this.onAddToCart.bind(this, this.props.product)}>

                </Button>
                <Confirm
                    confirmButton='Check out'
                    cancelButton='Continue'
                    header='Shopping Cart'
                    content='Added to cart'
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </span>
        );
    }
}

export default ButtonAddToCart;