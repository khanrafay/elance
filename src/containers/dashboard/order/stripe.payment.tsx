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
      <h3>
        Pay with {' '}
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="25">
          <path fill="#32325d" d="M5 10.1c0-.6.6-.9 1.4-.9 1.2 0 2.8.4 4 1.1V6.5c-1.3-.5-2.7-.8-4-.8C3.2 5.7 1 7.4 1 10.3c0 4.4 6 3.6 6 5.6 0 .7-.6 1-1.5 1-1.3 0-3-.6-4.3-1.3v3.8c1.5.6 2.9.9 4.3.9 3.3 0 5.5-1.6 5.5-4.5.1-4.8-6-3.9-6-5.7zM29.9 20h4V6h-4v14zM16.3 2.7l-3.9.8v12.6c0 2.4 1.8 4.1 4.1 4.1 1.3 0 2.3-.2 2.8-.5v-3.2c-.5.2-3 .9-3-1.4V9.4h3V6h-3V2.7zm8.4 4.5L24.6 6H21v14h4v-9.5c1-1.2 2.7-1 3.2-.8V6c-.5-.2-2.5-.5-3.5 1.2zm5.2-2.3l4-.8V.8l-4 .8v3.3zM61.1 13c0-4.1-2-7.3-5.8-7.3s-6.1 3.2-6.1 7.3c0 4.8 2.7 7.2 6.6 7.2 1.9 0 3.3-.4 4.4-1.1V16c-1.1.6-2.3.9-3.9.9s-2.9-.6-3.1-2.5H61c.1-.2.1-1 .1-1.4zm-7.9-1.5c0-1.8 1.1-2.5 2.1-2.5s2 .7 2 2.5h-4.1zM42.7 5.7c-1.6 0-2.5.7-3.1 1.3l-.1-1h-3.6v18.5l4-.7v-4.5c.6.4 1.4 1 2.8 1 2.9 0 5.5-2.3 5.5-7.4-.1-4.6-2.7-7.2-5.5-7.2zm-1 11c-.9 0-1.5-.3-1.9-.8V10c.4-.5 1-.8 1.9-.8 1.5 0 2.5 1.6 2.5 3.7 0 2.2-1 3.8-2.5 3.8z"/>
        </svg>
      </h3>
      
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