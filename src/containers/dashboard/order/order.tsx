import React, {FunctionComponent, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Order as OrderModel} from '../../../api/model/order';
import {jsonRequest} from "../../../api/request/request";
import {GET_ORDER} from "../../../api/routing/routes/dashboard";
import Layout from "../../layout/layout";

interface OrderProps extends RouteComponentProps<{id: string}>{

}

export const Order: FunctionComponent<OrderProps> = (props) => {
  
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderModel>();
  
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
      <h1>Order# {order?.orderId} <small className="text-muted text-sm align-middle">{order?.state?.toUpperCase()}</small></h1>
    </Layout>
  );
};