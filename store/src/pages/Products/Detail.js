import React, {Component} from 'react';
import {Container, Divider, Card, Icon, Image, Segment, Grid, Header, Rating} from 'semantic-ui-react'
import ButtonAddToCart from "./Components/ButtonAddToCart";
import ProductDescription from "./Components/ProductDescription";
import Loading from "../../Components/Loading";

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Product: {},
            loading: true
        };
    }

    componentDidMount() {

        this.state.ShoppingCartItems = JSON.parse(localStorage.getItem('shopping-cart') || '[]');

        fetch('http://localhost:9000/api/product/' + this.props.id, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.success) {
                    this.setState({Product: result.data});
                    this.setState({loading: false});
                }
            });
    }

    render() {
        const product = this.state.Product;
        if (this.state.loading === false) {
            return (
                <Segment style={{padding: '2em 0em', minHeight: 500}} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={product.image.coverImageUrl}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Header as="h1">{product.name}</Header>
                                <Header as="h2">Price: {product.price.price}</Header>
                                <Header as="h4">Discount: {product.promotion.discount} %</Header>
                                <Rating icon='star' defaultRating={5} maxRating={5}/>

                                <div style={{marginTop: '20px'}}>
                                    <ButtonAddToCart product={product}/>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Container>
                                <Divider />
                                <ProductDescription />
                            </Container>
                        </Grid.Row>


                    </Grid>

                </Segment>
            );
        } else {
            return (
                <Loading/>
            );
        }
    }
}

export default ProductDetail;
