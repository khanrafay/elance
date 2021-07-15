import React, {FunctionComponent} from 'react';
import Layout from "../layout/layout";

export interface PaymentsProps {

}

export const Payments: FunctionComponent<PaymentsProps> = (props) => {
  return (
    <Layout>
      <h1>Payments</h1>
    </Layout>
  );
};