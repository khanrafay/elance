import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Order as OrderModel, OrderStates} from '../../../../api/model/order';
import {jsonRequest} from "../../../../api/request/request";
import {
  APPROVE_ORDER_HISTORY,
  CANCEL_ORDER_HISTORY,
  CANCEL_ORDER_REQUEST,
  DELIVER_ORDER_REQUEST,
  GET_ORDER,
  UPDATE_ORDER_REQUEST
} from "../../../../api/routing/routes/dashboard";
import Layout from "../../layout/layout";
import {Link} from "react-router-dom";
import {ORDER_PAYMENT, SINGLE_MESSAGE} from "../../../routes/frontend.routes";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../../duck/auth/auth.selector";
import moment, {Moment} from "moment";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import _ from "lodash";
import {OrderHistory} from "../../../../api/model/order.history";

interface OrderProps extends RouteComponentProps<{ id: string }> {

}

export const Order: FunctionComponent<OrderProps> = (props) => {
  
  const user = useSelector(getAuthorizedUser);
  
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderModel>();
  const {register: cancelRegister, handleSubmit: handleCancelSubmit} = useForm();
  const {register: changeRegister, handleSubmit: handleChangeSubmit} = useForm();
  const {register: deliverRegister, handleSubmit: handleDeliverSubmit} = useForm();
  
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
  
  const [isCancelling, setCancelling] = useState(false);
  const [isDelivering, setDelivering] = useState(false);
  const [isChanging, setChanging] = useState(false);
  const startCancelling = () => {
    setDelivering(false);
    setChanging(false);
    setCancelling(true);
  };
  
  const startDelivering = () => {
    setCancelling(false);
    setChanging(false);
    setDelivering(true);
  };
  
  const startChanging = () => {
    setCancelling(false);
    setDelivering(false);
    setChanging(true);
  };
  
  const cancelOrder = async (values: any) => {
    if(!order){
      return;
    }
    setLoading(true);
    
    try {
      let response = await jsonRequest(CANCEL_ORDER_REQUEST.replace(':id', order?.id), {
        method: 'POST',
        body: JSON.stringify(values)
      });
      let json = await response.json();
      
      setOrder(json.order);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
      setCancelling(false);
    }
  };
  
  const changeOrder = async (values: any) => {
    if(!order){
      return;
    }
    setLoading(true);
  
    try {
      let response = await jsonRequest(UPDATE_ORDER_REQUEST.replace(':id', order?.id), {
        method: 'POST',
        body: JSON.stringify(values)
      });
      let json = await response.json();
    
      setOrder(json.order);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
      setChanging(false);
    }
  };
  
  const deliverOrder = async (values: any) => {
    if(!order){
      return;
    }
    setLoading(true);
  
    try {
      let response = await jsonRequest(DELIVER_ORDER_REQUEST.replace(':id', order?.id), {
        method: 'POST',
        body: JSON.stringify(values)
      });
      let json = await response.json();
    
      setOrder(json.order);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
      setDelivering(false);
    }
  };
  
  const processOrderHistory = async (history: OrderHistory) => {
    setLoading(true);
  
    try {
      let response = await jsonRequest(APPROVE_ORDER_HISTORY.replace(':id', history.id), {
        method: 'POST'
      });
      let json = await response.json();
    
      setOrder(json.order);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
      setDelivering(false);
    }
  };
  
  const cancelOrderHistory = async (history: OrderHistory) => {
    setLoading(true);
  
    try {
      let response = await jsonRequest(CANCEL_ORDER_HISTORY.replace(':id', history.id), {
        method: 'POST'
      });
      let json = await response.json();
    
      setOrder(json.order);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
      setDelivering(false);
    }
  };
  
  return (
    <Layout>
      <h1>Order# {order?.orderId} {' '}
        <small className="text-muted text-sm align-middle">{order?.state?.toUpperCase()}</small></h1>
      {order?.state?.toLowerCase() === OrderStates.PENDING && order?.buyer.id === user?.id && (
        <div className="text-center border p-3 rounded">
          <div className="alert alert-warning">Order is not yet started, please pay the order to start.</div>
          <Link to={ORDER_PAYMENT.replace(':id', order.id)} className="btn btn-primary">Make Payment</Link>
        </div>
      )}
      {order?.state?.toLowerCase() === OrderStates.PENDING && order?.seller.id === user?.id && (
        <div className="text-center border p-5 rounded bg-gray-100 shadow-inner">
          <h4 className="m-0">Order is not yet started, waiting for payment</h4>
        </div>
      )}
      {order?.state.toLowerCase() === OrderStates.PROGRESS && (
        <>
          <table className="table table-bordered table-hover">
            <tr>
              <th>Order No.</th>
              <td>{order?.orderId}</td>
            </tr>
            <tr>
              <th>Order Price</th>
              <td>{order.price}</td>
            </tr>
            <tr>
              <th>Buyer</th>
              <td>{order?.buyer?.displayName}</td>
            </tr>
            <tr>
              <th>Seller</th>
              <td>{order?.seller?.displayName}</td>
            </tr>
            <tr>
              <th>Service</th>
              <td>{order?.service?.title}</td>
            </tr>
            <tr>
              <th>Due on</th>
              <td title={order.deadline!}>{moment(order.deadline).fromNow()}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{order.description}</td>
            </tr>
          </table>
          
          <h3>Updates</h3>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Is approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.history.map(history => (
                <tr>
                  <th>{history.event}</th>
                  <td>{history.description}</td>
                  <td>{moment(history.createdAt).format('lll')}</td>
                  <td>{history.approved ? 'Yes' : 'No'}</td>
                  <td>
                    {history.createdBy.id !== user?.id && !history.approved && (
                      <button className="btn btn-primary mr-3" type="button" onClick={() => processOrderHistory(history)}>Approve</button>
                    )}
                    {!history.approved && (
                      <button className="btn btn-danger mr-3" type="button" onClick={() => cancelOrderHistory(history)}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-5 p-5 rounded border bg-gray-100 shadow-inner">
            {order.thread && (
              <Link to={SINGLE_MESSAGE.replace(':id', order?.thread.id)} className="btn btn-primary mr-3">Open Messages</Link>
            )}
            <button className={classNames(['btn btn-danger mr-3', isCancelling ? 'btn-lg' : ''])} onClick={startCancelling}>Cancel Order</button>
            {order.seller.id === user!.id && (
              <>
                <button className={classNames(['btn btn-warning mr-3', isChanging ? 'btn-lg' : ''])} onClick={startChanging}>Change Order</button>
                <button className={classNames(['btn btn-success mr-3', isDelivering ? 'btn-lg' : ''])} onClick={startDelivering}>Deliver Order</button>
              </>
            )}
            <div className="mt-3 text-left">
              {isCancelling && (
                <form onSubmit={handleCancelSubmit(cancelOrder)}>
                  <div className="form-group">
                    <label>Reason</label>
                    <textarea {...cancelRegister('reason')} placeholder="Reason" className="form-control" />
                  </div>
                  <button className="btn btn-danger mr-3" type="submit">Confirm</button>
                  <button className="btn" onClick={() => setCancelling(false)} type="button">Cancel</button>
                </form>
              )}
              {isChanging && (
                <form onSubmit={handleChangeSubmit(changeOrder)}>
                  <div className="form-group">
                    <label>Reason</label>
                    <textarea {...changeRegister('reason')} placeholder="Reason" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Days Extension</label>
                    <select {...changeRegister('days')} className="form-control">
                      {_.range(30).map((item, index) => (
                        <option value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-warning mr-3" type="submit">Confirm</button>
                  <button className="btn" onClick={() => setChanging(false)} type="button">Cancel</button>
                </form>
              )}
              {isDelivering && (
                <form onSubmit={handleDeliverSubmit(deliverOrder)}>
                  <div className="form-group">
                    <label>Reason</label>
                    <textarea {...deliverRegister('reason')} placeholder="Reason" className="form-control" />
                  </div>
                  <button className="btn btn-success mr-3" type="submit">Confirm</button>
                  <button className="btn" onClick={() => setDelivering(false)} type="button">Cancel</button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};