import React, {FunctionComponent, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Order as OrderModel, OrderStates} from '../../../../api/model/order';
import {jsonRequest} from "../../../../api/request/request";
import {GET_ORDER} from "../../../../api/routing/routes/dashboard";
import Layout from "../../layout/layout";
import {Link} from "react-router-dom";
import {SINGLE_ORDER} from "../../../routes/frontend.routes";
import {loadStripe} from '@stripe/stripe-js';
import {Elements,} from '@stripe/react-stripe-js';
import {StripePayment} from "./stripe.payment";
import {PaypalPayment} from "./paypal.payment";
import {currency} from "../../../../lib/currency/currency";

interface OrderProps extends RouteComponentProps<{ id: string }> {

}

export const OrderPayment: FunctionComponent<OrderProps> = (props) => {
  
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderModel>();
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  
  useEffect(() => {
    loadOrder(props.match.params.id);
  }, [props.match.params.id]);
  
  const loadOrder = async (orderId: string) => {
    setLoading(true);
    try {
      let response = await jsonRequest(GET_ORDER.replace(':id', orderId));
      let json = await response.json();
      setOrder(json.order);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <Elements stripe={stripePromise}>
        <h1>Order# {order?.orderId}
          <small className="text-muted text-sm align-middle">{order?.state?.toUpperCase()}</small></h1>
        {order?.state?.toLocaleLowerCase() === OrderStates.PENDING ? (
          <div className="text-center">
            <div className="alert alert-info h4">
              You will pay <strong>{currency()}{order.price}</strong> for this order
            </div>
            <div className="row mt-5">
              <div className="col text-center">
                <div className="border border-primary text-primary rounded-lg p-5">
                  <StripePayment />
                </div>
              </div>
              <div className="col text-center">
                <div className="border border-primary text-primary rounded-lg p-5">
                  <PaypalPayment orderId={order.id} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center">This order is already paid</h1>
            {order && (
              <Link to={SINGLE_ORDER.replace(':id', order?.id)} className="btn btn-primary">Back to Order</Link>
            )}
          </>
        )}
      </Elements>
    </Layout>
  );
};
