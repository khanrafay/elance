import React, {FunctionComponent, useState} from "react";
import {jsonRequest} from "../../../api/request/request";
import {ORDER_PAYMENT_PAYPAL} from "../../../api/routing/routes/dashboard";

export const PaypalPayment: FunctionComponent<{orderId: string}> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const handlePayment = async () => {
    setLoading(true);
    try {
      let response = await jsonRequest(ORDER_PAYMENT_PAYPAL.replace(':id', props.orderId));
      let json = await response.json();
  
      window.location.href = json.link;
    }catch (e) {
    
    }finally {
      setLoading(false);
    }
    
  };
  
  return (
    <>
      <h3>Pay with <img src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal" width={100}/></h3>
      <button className="btn btn-primary mt-3" onClick={handlePayment} disabled={isLoading}>Pay with PayPal</button>
    </>
  );
};