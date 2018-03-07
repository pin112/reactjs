import React, {Component} from 'react';
import {Table, Button, Input, Icon, Header} from 'semantic-ui-react';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShoppingCartItems: []
        };
    }

    componentDidMount() {
        this.setState({ShoppingCartItems: JSON.parse(localStorage.getItem('shopping-cart') || '[]')});
    }

    onRemoveCart(item) {
        var items = this.state.ShoppingCartItems;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                items.splice(i, 1);
                this.setState({ShoppingCartItems: items});
                localStorage.setItem('shopping-cart', JSON.stringify(this.state.ShoppingCartItems));
                return false;
            }
        }
    }

    onIncreaseQuantity(item) {
        var items = this.state.ShoppingCartItems;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                items[i].quantity++;
                this.setState({ShoppingCartItems: items});
                localStorage.setItem('shopping-cart', JSON.stringify(this.state.ShoppingCartItems));
                return false;
            }
        }
    }

    onDecreaseQuantity(item) {
        if (item.quantity === 1) return;
        var items = this.state.ShoppingCartItems;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                items[i].quantity--;
                this.setState({ShoppingCartItems: items});
                localStorage.setItem('shopping-cart', JSON.stringify(this.state.ShoppingCartItems));
                return false;
            }
        }
    }


    // TOTAL
    formatCurrency(number) {
        var options = {style: 'currency', currency: 'USD'};
        var numberFormat = new Intl.NumberFormat('en-US', options);

        return numberFormat.format(number);
    }

    getTotal() {
        var total = Object.keys(this.state.ShoppingCartItems).reduce((previous, key) => {
            return previous + this.state.ShoppingCartItems[key].price * this.state.ShoppingCartItems[key].quantity;
        }, 0);

        return this.formatCurrency(total);
    }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>No.</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Total</Table.HeaderCell>
                            <Table.HeaderCell>
                                Action
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.ShoppingCartItems.map((item, index) =>
                                <Table.Row key={item.id}>
                                    <Table.Cell width='1' singleLine={true} textAlign="right">{index + 1}</Table.Cell>
                                    <Table.Cell singleLine={true}  textAlign="left">{item.name}</Table.Cell>
                                    <Table.Cell width='1' singleLine={true} textAlign="right">{this.formatCurrency(item.price)}</Table.Cell>
                                    <Table.Cell width='1' singleLine={true} textAlign="right">
                                        <Button icon onClick={this.onDecreaseQuantity.bind(this, item)} compact={true}>
                                            <Icon name='minus'/>
                                        </Button>
                                        <Input style={{width: '60px', marginRight: '4px', textAlign: 'center' }} type='text' value={item.quantity} />
                                        <Button color='blue' icon onClick={this.onIncreaseQuantity.bind(this, item)} compact={true}>
                                            <Icon name='plus'/>
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell width='1' singleLine={true} textAlign="right">{this.formatCurrency(item.price * item.quantity)}</Table.Cell>
                                    <Table.Cell width='1' singleLine={true} textAlign="right">
                                        <Button onClick={this.onRemoveCart.bind(this, item)} compact={true} color='red'>Remove</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>

                <Header>TOTAL: {this.getTotal()}</Header>
            </div>
        );
    }
}

export default ShoppingCart;
