import React, {FunctionComponent} from 'react';
import Layout from "../layout/layout";

export interface DashboardProps {

}

export const Dashboard: FunctionComponent<DashboardProps> = (props) => {
	return (
		<Layout>
			<h3>Dashboard</h3>
		</Layout>
	);
};