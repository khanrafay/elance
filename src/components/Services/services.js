import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ServiceImage from '../../Images/download.png';
const Services = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel responsive={responsive}>
                {Array(6).fill().map((_, i) => (
                    <div className="services">
                        <Card>
                            <CardImg top width="100%" src={ServiceImage} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card></div>
                ))}
        </Carousel>
    );
}

export default Services;