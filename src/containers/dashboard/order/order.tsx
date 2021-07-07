import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Order as OrderModel, OrderStates} from '../../../api/model/order';
import {jsonRequest} from "../../../api/request/request";
import {GET_ORDER} from "../../../api/routing/routes/dashboard";
import Layout from "../../layout/layout";
import {Link} from "react-router-dom";
import {INBOX, ORDER_PAYMENT, SINGLE_MESSAGE} from "../../../routes";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../duck/auth/auth.selector";
import moment from "moment";
import {useForm} from "react-hook-form";
import classNames from "classnames";

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
  
  const cancelOrder = useCallback(async (values) => {
    console.log('cancelling order')
  }, []);
  
  const changeOrder = useCallback(async (values) => {
    console.log('chaning order')
  }, []);
  
  const deliverOrder = useCallback(async (values) => {
    console.log('devliery order')
  }, []);
  
  return (
    <Layout>
      <h1>Order# {order?.orderId}
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
          
          <div className="text-center mt-5 p-5 rounded border bg-gray-100 shadow-inner">
            <button className={classNames(['btn btn-danger mr-3', isCancelling ? 'btn-lg' : ''])} onClick={startCancelling}>Cancel Order</button>
            {order.thread && (
              <Link to={SINGLE_MESSAGE.replace(':id', order?.thread.id)} className="btn btn-primary mr-3">Open Message</Link>
            )}
            <button className={classNames(['btn btn-warning mr-3', isChanging ? 'btn-lg' : ''])} onClick={startChanging}>Change Order</button>
            <button className={classNames(['btn btn-success mr-3', isDelivering ? 'btn-lg' : ''])} onClick={startDelivering}>Deliver Order</button>
            
            <div className="mt-3">
              {isCancelling && (
                <form onSubmit={handleCancelSubmit(cancelOrder)}>
                  <div className="form-group">
                    <textarea {...cancelRegister('reason')} placeholder="Reason" className="form-control border-danger" />
                  </div>
                  <button className="btn btn-danger mr-3" type="submit">Confirm</button>
                  <button className="btn" onClick={() => setCancelling(false)} type="button">Cancel</button>
                </form>
              )}
  
              {isChanging && (
                <form onSubmit={handleChangeSubmit(changeOrder)}>
                  <div className="form-group">
                    <textarea {...changeRegister('reason')} placeholder="Reason" className="form-control border-warning" />
                  </div>
                  <button className="btn btn-warning mr-3" type="submit">Confirm</button>
                  <button className="btn" onClick={() => setChanging(false)} type="button">Cancel</button>
                </form>
              )}
  
              {isDelivering && (
                <form onSubmit={handleDeliverSubmit(deliverOrder)}>
                  <div className="form-group">
                    <textarea {...deliverRegister('reason')} placeholder="Reason" className="form-control border-success" />
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