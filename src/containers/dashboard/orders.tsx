import React, {FunctionComponent} from 'react';
import Layout from "../layout/layout";

export interface OrdersProps {

}

export const Orders: FunctionComponent<OrdersProps> = (props) => {
	return (
		<Layout>
			<h1>Orders</h1>
		</Layout>
	);
};