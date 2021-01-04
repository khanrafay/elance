import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import Service from '../../components/Service/service';

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
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <FormGroup>
                        {/* <Label for="exampleSearch">Search</Label> */}
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder="search placeholder"
                        />
                    </FormGroup>
                </Col>
                <Carousel responsive={responsive}>
                    {Array(6).fill().map((_, i) => (
                        <div className="services">
                            <Col>
                                <Service />
                            </Col>
                        </div>
                    ))}
                </Carousel>

            </Row>
        </React.Fragment>

    );
}

export default Services;