import React, {FunctionComponent, useEffect, useState} from 'react';
import Layout from "../../layout/layout";
import {Order as OrderModel} from "../../../api/model/order";
import {jsonRequest} from "../../../api/request/request";
import {ORDERS_LIST} from "../../../api/routing/routes/dashboard";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../duck/auth/auth.selector";
import {useHistory} from "react-router";
import {SINGLE_ORDER} from "../../../routes";
import moment from "moment";

export interface OrdersProps {

}

export const Orders: FunctionComponent<OrdersProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const user = useSelector(getAuthorizedUser);
  const history = useHistory();
  
  const loadOrders = async () => {
    setLoading(true);
    try {
      let response = await jsonRequest(ORDERS_LIST);
      let json = await response.json();
      setOrders(json.orders);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>ID</th>
          <th>Buyer/Seller</th>
          <th>Service</th>
          <th>Due on</th>
          <th>Delivered at</th>
          <th>Total</th>
          <th>Notes</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={8} className="p-5 text-center">Loading...</td>
          </tr>
        ) : (
          <>
            {orders.map(order => (
              <tr onClick={() => history.push(SINGLE_ORDER.replace(':id', order.id))}>
                <td>{order.orderId}</td>
                <td>
                  {user?.buyer?.id === order.buyer.id ? 'Me' : order.buyer.displayName}
                  /
                  {user?.seller?.id === order.seller.id ? 'Me' : order.seller.displayName}
                </td>
                <td>{order.service!.title}</td>
                <td title={order.deadline!}>{moment(order.deadline).fromNow()}</td>
                <td>{order.completeAt}</td>
                <td>{order.price}</td>
                <td>{order.description}</td>
                <td>{order.state}</td>
              </tr>
            ))}
          </>
        )}
        </tbody>
      </table>
    </Layout>
  );
};