import React, {FunctionComponent} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import ServiceImage from '../../../Images/download.png';
import {Service as ServiceModel} from "../../../api/model/service";
import {CardFooter} from "reactstrap/es";

export interface ServiceProps {
  service: ServiceModel
}

const Service: FunctionComponent<ServiceProps> = ({service}) => {
  return (
    <Card className="mb-2">
      <CardImg top width="100%" src={ServiceImage} alt="Card image cap" />
      <CardBody>
        <CardTitle title={service.title} tag="h5" className="text-dark text-truncate">{service.title}</CardTitle>
        <CardText style={{
          maxHeight: '200px',
          overflow: 'hidden'
        }} className="text-dark">{service.description}</CardText>
      </CardBody>
      <CardFooter className="text-right">
        From ${service.minPrice}
      </CardFooter>
    </Card>
  );
};

export default Service;