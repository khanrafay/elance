import React, {FunctionComponent} from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import ServiceImage from '../../Images/download.png';

export interface ServiceProps{
    title: string;
    description: string;
}

const Service: FunctionComponent<ServiceProps> = (props) => {
    return (
        <Card>
            <CardImg top width="100%" src={ServiceImage} alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">{props.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>{props.description}</CardText>
                <Button>View</Button>
            </CardBody>
        </Card>
    );
}

export default Service;