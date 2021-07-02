import React, {FunctionComponent, useState} from "react";
import {Offer as OfferModel} from "../../api/model/offer";
import {jsonRequest} from "../../api/request/request";
import {ACCEPT_OFFER, REJECT_OFFER} from "../../api/routing/routes/dashboard";
import {UnauthorizedException, UnprocessableEntityException} from "../../lib/http/exception/http.exception";
import {ValidationExceptionFactory} from "../../api/exception/validation/validation.exception.factory";
import {Link} from "react-router-dom";
import {SINGLE_ORDER} from "../../routes";

export const Offer: FunctionComponent<{
  offer: OfferModel;
  onAccept?: () => void;
  onCancel?: () => void;
}> = ({
 offer, onAccept, onCancel
}) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();
  
  const acceptOffer = async () => {
    setError(undefined);
    setLoading(true);
    try {
      await jsonRequest(ACCEPT_OFFER.replace(':id', offer.id), {
        method: 'POST',
      });
      if(typeof onAccept === 'function'){
        onAccept();
      }
      
    }catch (e) {
      if(e instanceof UnprocessableEntityException){
        let validations = await ValidationExceptionFactory.createFromUnprocessableEntityException(e);
        if(validations.errorMessage){
          setError(validations.errorMessage);
        }
      }else {
        if(e instanceof UnauthorizedException){
          throw e;
        }
      }
    }finally {
      setLoading(false);
    }
  };
  
  const cancelOffer = async () => {
    setError(undefined);
    setLoading(true);
    try {
      await jsonRequest(REJECT_OFFER.replace(':id', offer.id), {
        method: 'POST',
      });
      if(typeof onCancel === 'function'){
        onCancel();
      }
      
    }catch (e) {
      if(e instanceof UnprocessableEntityException){
        let validations = await ValidationExceptionFactory.createFromUnprocessableEntityException(e);
        if(validations.errorMessage){
          setError(validations.errorMessage);
        }
      }else {
        throw e;
      }
    }finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="border p-2 rounded custom-offer">
      <h5 className="heading">Custom offer</h5>
      <h5 className="title">
        {offer.service!.title}
        <span className="float-right price">
          ${offer.price}
        </span>
      </h5>
      <p>Delivery with in {offer.duration} {offer.durationUnit}</p>
      <p>{offer.description}</p>
      <div className="text-right">
        <hr />
        {error && (
          <div className="alert alert-danger text-left">{error}</div>
        )}
        {offer.isAccepted && (
          <>
            <strong>Accepted</strong>
            {offer.orderId && (
              <Link to={SINGLE_ORDER.replace(':id', offer.orderId)} className="btn btn-outline-primary ml-3">View Order</Link>
            )}
          </>
        )}
        {offer.isExpired && (
          <strong>Expired</strong>
        )}
        {offer.isCancelled && (
          <strong>Cancelled</strong>
        )}
        {(offer.isAccepted || offer.isCancelled || offer.isExpired) ? (
          <></>
        ) : (
          <>
            <button className="btn mr-4 btn-outline-danger" onClick={cancelOffer} disabled={isLoading}>Cancel</button>
            <button className="btn btn-primary" onClick={acceptOffer} disabled={isLoading}>Accept</button>
          </>
        )}
      </div>
    </div>
  );
};