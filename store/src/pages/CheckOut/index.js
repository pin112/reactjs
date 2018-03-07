import React, { Component } from 'react';

import ShoppingCart from "../../Components/ShoppingCart";

import {
	Segment,
	Grid,
} from 'semantic-ui-react'

class CheckOut extends Component {

    render() {
		return (
			<Segment style={{ padding: '2em 0em' }} vertical>
				<Grid container stackable verticalAlign='middle'>
					<Grid.Row>
						<Grid.Column>
							<h2>CheckOut</h2>
							<ShoppingCart/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default CheckOut;