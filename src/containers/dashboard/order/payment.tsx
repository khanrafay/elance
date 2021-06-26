import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Order as OrderModel, OrderStates} from '../../../api/model/order';
import {jsonRequest} from "../../../api/request/request";
import {GET_ORDER} from "../../../api/routing/routes/dashboard";
import Layout from "../../layout/layout";
import {Link} from "react-router-dom";
import {SINGLE_ORDER} from "../../../routes";
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {StripePayment} from "./stripe.payment";
import {PaypalPayment} from "./paypal.payment";

interface OrderProps extends RouteComponentProps<{id: string}>{

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
    try{
      let response = await jsonRequest(GET_ORDER.replace(':id', orderId));
      let json = await response.json();
      setOrder(json.order);
    }catch (e) {
      throw e;
    }finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <Elements stripe={stripePromise}>
        <h1>Order# {order?.orderId} <small className="text-muted text-sm align-middle">{order?.state?.toUpperCase()}</small></h1>
        {order?.state?.toLocaleLowerCase() === OrderStates.PENDING ? (
          <div className="text-center">
            <div className="row mt-5">
              <div className="col text-center">
                <div className="border border-primary text-primary rounded-lg p-5">
                  <h3>
                    Pay with {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="25">
                      <path fill="#32325d" d="M5 10.1c0-.6.6-.9 1.4-.9 1.2 0 2.8.4 4 1.1V6.5c-1.3-.5-2.7-.8-4-.8C3.2 5.7 1 7.4 1 10.3c0 4.4 6 3.6 6 5.6 0 .7-.6 1-1.5 1-1.3 0-3-.6-4.3-1.3v3.8c1.5.6 2.9.9 4.3.9 3.3 0 5.5-1.6 5.5-4.5.1-4.8-6-3.9-6-5.7zM29.9 20h4V6h-4v14zM16.3 2.7l-3.9.8v12.6c0 2.4 1.8 4.1 4.1 4.1 1.3 0 2.3-.2 2.8-.5v-3.2c-.5.2-3 .9-3-1.4V9.4h3V6h-3V2.7zm8.4 4.5L24.6 6H21v14h4v-9.5c1-1.2 2.7-1 3.2-.8V6c-.5-.2-2.5-.5-3.5 1.2zm5.2-2.3l4-.8V.8l-4 .8v3.3zM61.1 13c0-4.1-2-7.3-5.8-7.3s-6.1 3.2-6.1 7.3c0 4.8 2.7 7.2 6.6 7.2 1.9 0 3.3-.4 4.4-1.1V16c-1.1.6-2.3.9-3.9.9s-2.9-.6-3.1-2.5H61c.1-.2.1-1 .1-1.4zm-7.9-1.5c0-1.8 1.1-2.5 2.1-2.5s2 .7 2 2.5h-4.1zM42.7 5.7c-1.6 0-2.5.7-3.1 1.3l-.1-1h-3.6v18.5l4-.7v-4.5c.6.4 1.4 1 2.8 1 2.9 0 5.5-2.3 5.5-7.4-.1-4.6-2.7-7.2-5.5-7.2zm-1 11c-.9 0-1.5-.3-1.9-.8V10c.4-.5 1-.8 1.9-.8 1.5 0 2.5 1.6 2.5 3.7 0 2.2-1 3.8-2.5 3.8z"/>
                    </svg>
                  </h3>
                  <StripePayment/>
                </div>
              </div>
              <div className="col text-center">
                <div className="border border-primary text-primary rounded-lg p-5">
                  <h3>Pay with <img src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal" width={100}/></h3>
                  <PaypalPayment orderId={order.id}/>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center">This order is already paid</h1>
            <Link to={SINGLE_ORDER.replace(':id', order?.id)} className="btn btn-primary">Back to Order</Link>
          </>
        )}
      </Elements>
    </Layout>
  );
};