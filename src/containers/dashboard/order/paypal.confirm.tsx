import React, {FunctionComponent, useEffect, useState} from "react";
import {jsonRequest, request} from "../../../api/request/request";
import {CONFIRM_PAYPAL_PAYMENT} from "../../../api/routing/routes/dashboard";
import Layout from "../../layout/layout";
import {RouteComponentProps, useHistory, useLocation} from "react-router";
import {QueryString} from "../../../lib/location/query.string";
import {SINGLE_ORDER} from "../../../routes";

interface PaypalConfirmProps extends RouteComponentProps<{ id: string, token: string }> {}

export const PaypalConfirm: FunctionComponent<PaypalConfirmProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const confirmPayment = async () => {
    setLoading(true);
    let searchString = QueryString.parse(location.search);
    let queryString = new URLSearchParams();
    queryString.append('token', searchString.token as string);
    
    try {
      let response = await request(
          CONFIRM_PAYPAL_PAYMENT
          .replace(':id', props.match.params.id)
          .replace(':token', props.match.params.token)
      , {
          body: queryString,
          method: 'POST'
      });
      
      let json = await response.json();
      setSuccess(true);
      
      history.push(SINGLE_ORDER.replace(':id', props.match.params.id));
    } catch (e) {
      setError(true);
      // throw e;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    confirmPayment();
  }, []);
  
  return (
    <Layout>
      <h1>Please wait...</h1>
    </Layout>
  );
};