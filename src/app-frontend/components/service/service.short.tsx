import React, {FunctionComponent, HTMLAttributes} from "react";
import {Service as ServiceModel} from "../../../api/model/service";
import ServiceImage from "../../../Images/download.png";
import {Image} from "../image/image";
import classNames from "classnames";


interface ServiceProps extends HTMLAttributes<{className: any}>{
  service: ServiceModel
}

export const ServiceShort: FunctionComponent<ServiceProps> = ({service, className}) => {
  return (
    <div className={classNames(
      "card",
      className
    )}>
      <div className="row no-gutters">
        <div className="col-md-4">
          {service.images.length > 0 ? (
            <Image image={service.images[0]} h={121} fit={"fill"}/>
          ) : (
            <img src={ServiceImage} className="img-fluid" alt={service.title} />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body pt-1">
            <h5 className="card-title">{service.title}</h5>
            <p className="card-text"><small className="text-muted">From ${service.minPrice}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};