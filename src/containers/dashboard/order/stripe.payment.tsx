import React, {FunctionComponent, useCallback, useState} from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export const StripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState<string|undefined>();
  const [isLoading, setLoading] = useState(false);
  
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors(undefined);
    if(stripe && elements) {
      const {error, paymentMethod} = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });
      
      setLoading(false);
      
      if(error){
        setErrors(error.message);
      }
    }
  }, [stripe, elements]);
  
  return (
    <form onSubmit={handleSubmit}>
      {errors && (
        <div className="alert alert-danger text-left mb-3">{errors}</div>
      )}
      <div className="my-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe || isLoading}>
        Pay with Stripe
      </button>
    </form>
  );
};